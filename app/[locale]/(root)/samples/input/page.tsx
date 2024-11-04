"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  controlledInputCodes,
  disabledInputCodes,
  errorInlineInputCodes,
  inputWithHookFormCodes,
} from "@/shared/data/samples.data";
import SyntaxHighlighter from "@/components/ui/syntax-highlighter";
import { SubmitHandler, useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";

type InputType = {
  example4: string;
};

export default function InputExamplePage() {
  const [value, setValue] = useState("Input 1");
  const { openModal } = useModal();
  const { register, handleSubmit } = useForm<InputType>({
    defaultValues: {
      example4: "",
    },
  });

  const onSubmit: SubmitHandler<InputType> = (data: InputType) => {
    openModal({
      isOpen: false,
      title: "Form Input Data",
      modalContent: <h1>{data.example4}</h1>,
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
                <Label htmlFor="example2">Disabled Input</Label>
                <Input
                  id="example2"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled
                  className="max-w-96"
                />
                <Label htmlFor="example3">Error Inline Input</Label>
                <Input
                  id="example3"
                  errorMessage={"This is an error message"}
                  className="max-w-96"
                />
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
                >
                  <Label htmlFor="example4">Input With React Hook Form</Label>
                  <Input
                    id="example4"
                    {...register("example4")}
                    className="max-w-96"
                  />
                  <Button type="submit" variant="default" className="max-w-20">
                    Submit
                  </Button>
                </form>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <SyntaxHighlighter content={controlledInputCodes} />
              <SyntaxHighlighter content={disabledInputCodes} />
              <SyntaxHighlighter content={errorInlineInputCodes} />
              <SyntaxHighlighter content={inputWithHookFormCodes} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
