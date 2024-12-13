import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "./categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 character." })
    .max(45),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

interface Props {
  onFormSubmit: (expense: FormData) => void;
}

type FormData = z.infer<typeof schema>;

const ExpenseForm = ({ onFormSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitFunction = (data: FormData) => onFormSubmit(data);

  return (
    <form className="mb-4" onSubmit={handleSubmit(submitFunction)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          type="text"
          className="form-control"
          id="description"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amout" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          className="form-control"
          id="amout"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} className="form-select" id="category">
          <option value=""></option>
          {categories.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;