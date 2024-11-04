/* INPUT SAMPLE*/
export const controlledInputCodes = `//Controlled Input 
import {Input} from "@/components/ui/input";
const [value, setValue] = useState<string>('Input 1');
<Input id="example1" value={value} onChange={(e) => setValue(e.target.value)}/>
`;

export const disabledInputCodes = `//Disabled Input 
import {Input} from "@/components/ui/input";
const [value, setValue] = useState<string>('Input 1');
<Input id="example1" value={value} onChange={(e) => setValue(e.target.value)} disabled/>`;

export const errorInlineInputCodes = `//Error Inline Input 
import {Input} from "@/components/ui/input";
<Input id="example3" errorMessage={"This is an error message"} />`;

export const formInputCodes = `// Form Input 
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

const FormInputSchema = z.object({
    inputExample: z
      .string({
        required_error: "Please enter a value",
      }),
})

export default function InputPage() {
    const { openModal } = useModal();
    const form = useForm<z.infer<typeof FormInputSchema>>({
        resolver: zodResolver(FormInputSchema)
    });

    const onSubmit = (data: z.infer<typeof FormInputSchema>) => {
        openModal({
          isOpen: false,
          title: "Form Input Data",
          modalContent: <h1>{data.inputExample}</h1>,
        });
    };
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
            >
                <FormField
                    control={form.control}
                    name="inputExample"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Form Input</FormLabel>
                          <Input type="text" value={field.value} onChange={field.onChange}/>
                          <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="default" className="max-w-20">
                  Submit
                </Button>
            </form>
        </Form>
    )
`;

/* GRID SAMPLE*/
export const paginationGridCodes = `// Pagination Grid
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import {columns, data} from "@/shared/data/grid-mock.data";
import {useState} from "react";
import {PaginationState} from "@/types/common.type";

export default function PaginationGridPage() {
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 5});
    const table = useMaterialReactTable({
      columns: columns, 
      data: data, 
      state: { pagination }, 
      paginationDisplayMode: 'pages',
      muiPaginationProps: {
          color: 'primary',
          shape: 'rounded',
          showRowsPerPage: false,
          variant: 'outlined',
      },
      onPaginationChange: setPagination
    });
    
    return (
        <MaterialReactTable table={table} />
    )
}`;

/* MULTIPLE SELECTOR SAMPLE*/
export const defaultMultipleSelectorCodes = `//Default Multiple Selector 
import MultipleSelector, {Option} from "@/components/ui/multiple-selector";
<MultipleSelector
  options={[
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
      {label: 'Option 3', value: 'option3'},
      {label: 'Option 4', value: 'option4'},
      {label: 'Option 5', value: 'option5'},
  ]}
/>`;

export const controlledMultipleSelectorCodes = `//Controlled Multiple Selector 
import MultipleSelector, {Option} from "@/components/ui/multiple-selector";
const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
<MultipleSelector
  options={[
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
      {label: 'Option 3', value: 'option3'},
      {label: 'Option 4', value: 'option4'},
      {label: 'Option 5', value: 'option5'},
  ]}
  value={selectedOptions}
  onChange={(e) => setSelectedOptions(e)}
/>`;

export const formMultipleSelectorCodes = `//Form Multiple Selector 
import MultipleSelector from "@/components/ui/multiple-selector";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

const FormSchema = z.object({
    selectedOptions: z
        .array(z.object({
            label: z.string(),
            value: z.string(),
        }), {
            required_error: "Please select an option",
        }),
})

export default function MultipleSelectorPage() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        // Do something with the form data
        toast(() => (
            <span className="text-black font-semibold">
                {JSON.stringify(data.selectedOptions)}
            </span>
        ));
    };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name="selectedOptions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Multiple Selector With React Hook Form </FormLabel>
                            <MultipleSelector
                                options={[
                                    {label: 'Option 1', value: 'option1'},
                                    {label: 'Option 2', value: 'option2'},
                                    {label: 'Option 3', value: 'option3'},
                                    {label: 'Option 4', value: 'option4'},
                                    {label: 'Option 5', value: 'option5'},
                                ]}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder={'Select Options'}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="default" className="max-w-20">Submit</Button>
            </form>
        </Form>
    )
}`;