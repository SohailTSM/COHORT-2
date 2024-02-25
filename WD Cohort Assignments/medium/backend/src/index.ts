import { Hono } from 'hono';
import * as jwt from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    ENC_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use('/api/v1/blog/*', async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return c.json({ message: 'Unauthorized access' }, 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await jwt.verify(token, c.env.JWT_SECRET);
    if (!decoded) {
      return c.json({ message: 'Unauthorized access' }, 401);
    }
    c.set('userId', decoded.id);
    await next();
  } catch (error) {
    return c.json({ message: 'Unauthorized access' }, 401);
  }
});

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: {
    email: string;
    password: string;
    name: string;
  } = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name,
    },
  });

  const token = await jwt.sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    token,
  });
});

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: {
    email: string;
    password: string;
  } = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    return c.json({ message: 'Invalid email or password' }, 401);
  }

  const token = await jwt.sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    token,
  });
});

app.get('/api/v1/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param('id');
  const post = await prisma.post.findUnique({ where: { id } });
  return c.json({ post });
});

app.post('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get('userId');

  const body: {
    title: string;
    content: string;
  } = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({ id: post.id, message: 'Post created' });
});

app.put('/api/v1/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get('userId');
  const id = c.req.param('id');

  const body = await c.req.json();
  const post = await prisma.post.update({
    where: {
      id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ post, message: 'Post updated' });
});

export default app;
