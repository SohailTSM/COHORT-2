/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let category = {};
  for (let i = 0; i < transactions.length; i++) {
    category[transactions[i]['category']] =
      category[transactions[i]['category']] + transactions[i]['price'] ||
      transactions[i]['price'];
  }
  let res = Object.entries(category).map((entry) => {
    const [key, value] = entry;
    return { category: key, totalSpent: value };
  });
  return res;
}

module.exports = calculateTotalSpentByCategory;
