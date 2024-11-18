'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  controlledInputCodes,
  disabledInputCodes,
  errorInlineInputCodes,
  formInputCodes,
} from '@/shared/data/samples.data';
import SyntaxHighlighter from '@/components/ui/syntax-highlighter';
import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

const FormInputSchema = z.object({
  inputExample: z.string().min(1, {
    message: 'Please enter a value',
  }),
});

export default function InputExamplePage() {
  const [value, setValue] = useState('Input 1');
  const { openModal } = useModal();
  const form = useForm<z.infer<typeof FormInputSchema>>({
    resolver: zodResolver(FormInputSchema),
  });

  const onSubmit = (data: z.infer<typeof FormInputSchema>) => {
    openModal({
      isOpen: false,
      title: 'Form Input Data',
      description: 'This is the data from the form input',
      modalContent: <h1>{data.inputExample}</h1>,
    });
  };

  return (
    <>
      <h2 className="text-lg font-bold md:text-xl">SAMPLE INPUT</h2>
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex-1">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="flex flex-col h-auto rounded border gap-4 p-4">
                <Label htmlFor="example1">Controlled Input</Label>
                <Input
                  id="example1"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="max-w-96"
                />
                <Separator />
                <Label htmlFor="example2">Disabled Input</Label>
                <Input
                  id="example2"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled
                  className="max-w-96"
                />
                <Separator />
                <Label htmlFor="example3" className="text-red-500">
                  Error Inline Input
                </Label>
                <Input
                  id="example3"
                  errorMessage={'This is an error message'}
                  className="max-w-96"
                />
                <Separator />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                  >
                    <FormField
                      control={form.control}
                      name="inputExample"
                      render={({ field, formState: { errors } }) => (
                        <FormItem>
                          <FormLabel>Form Input</FormLabel>
                          <Input
                            type="text"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            hasError={!!errors.inputExample}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="default"
                      className="max-w-20"
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <SyntaxHighlighter content={controlledInputCodes} />
              <SyntaxHighlighter content={disabledInputCodes} />
              <SyntaxHighlighter content={errorInlineInputCodes} />
              <SyntaxHighlighter content={formInputCodes} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
