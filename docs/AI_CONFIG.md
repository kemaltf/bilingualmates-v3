# AI Configuration & Coding Standards

## Form Handling Standards

All forms in this project MUST use the following stack and patterns:

1.  **Library**: `react-hook-form`
    *   Do NOT use local state (`useState`) for form fields.
    *   Use the `useForm` hook for form state management.

2.  **Validation**: `zod` with `@hookform/resolvers/zod`
    *   Define a Zod schema for every form.
    *   Infer TypeScript types from the Zod schema (`z.infer<typeof Schema>`).

3.  **Components**:
    *   Integrate with UI components (Input, Select, etc.) using the `register` method or `Controller` if necessary.
    *   Display validation errors clearly below each field using `formState.errors`.

### Example Pattern

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(2),
});

type FormValues = z.infer<typeof formSchema>;

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}
    </form>
  );
}
```
