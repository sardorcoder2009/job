import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm from "./ExpenseForm";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 0, description: "aaa", amount: 5, category: "Utilities" },
    { id: 1, description: "bbb", amount: 10, category: "Entertainment" },
    { id: 2, description: "ccc", amount: 3, category: "Groceries" },
    { id: 3, description: "ddd", amount: 4, category: "Utilities" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dynamicExpenses = selectedCategory
    ? expenses.filter((exp) => exp.category === selectedCategory)
    : expenses;

  return (
    <div className="p-5">
      <ExpenseForm
        onFormSubmit={(data) =>
          setExpenses([...expenses, { ...data, id: expenses.length }])
        }
      />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ExpenseList
        onDelete={(id) => setExpenses(expenses.filter((exp) => exp.id !== id))}
        expenses={dynamicExpenses}
      />
    </div>
  );
};

export default App;