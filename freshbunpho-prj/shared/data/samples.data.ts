/* INPUT SAMPLE*/
export const controlledInputCodes = `//Controlled Input 
+ import {Input} from "@/components/ui/input";
+ const [value, setValue] = useState<string>('Input 1');
+ <Input id="example1" value={value} onChange={(e) => setValue(e.target.value)}/>
`;

export const disabledInputCodes = `//Disabled Input 
+ import {Input} from "@/components/ui/input";
+ const [value, setValue] = useState<string>('Input 1');
+ <Input id="example1" value={value} onChange={(e) => setValue(e.target.value)} disabled/>`;

export const errorInlineInputCodes = `//Error Inline Input 
+ import {Input} from "@/components/ui/input";
+ <Input id="example3" errorMessage={"This is an error message"} />`;

export const inputWithHookFormCodes = `// Input with react-hook-form 
+ import {Input} from "@/components/ui/input";
+ import {useForm} from "react-hook-form";
// States, Functions, Types
+ type InputType = { example4: string; }
+ const { register, handleSubmit } = useForm<InputType>();
+ const onSubmit: SubmitHandler<InputType> = (data: InputType) => {console.log(data)};
// Form Html
+ <form onSubmit={handleSubmit(onSubmit)}>
+  <Label htmlFor="example4">Input With React Hook Form</Label>
+  <Input id="example4" {...register("example4")} />
+ </form>`;
