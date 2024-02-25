import { Hono } from 'hono';
import jwt from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Bindings } from 'hono/types';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

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

app.post('/api/v1/signin', (c) => {
  return c.text('signin route');
});

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  console.log(id);
  return c.text('get blog route');
});

app.post('/api/v1/blog', (c) => {
  return c.text('create blog route');
});

app.put('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  console.log(id);
  return c.text('update blog route');
});

export default app;
