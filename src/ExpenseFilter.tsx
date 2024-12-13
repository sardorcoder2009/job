import { categories } from "./categories";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      onChange={(event) => onSelectCategory(event.target.value)}
      className="form-select mb-4"
    >
      <option value="">All categories</option>
      {categories.map((c) => (
        <option value={c} key={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;