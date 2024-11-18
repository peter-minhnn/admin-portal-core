'use client';
import { useEffect, useReducer } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'; // Shadcn UI import
import { Input } from '@/components/ui/input'; // Shandcn UI Input
import { UseFormReturn } from 'react-hook-form';

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  namespace: string;
  maxLength?: number;
  reset?: boolean;
};

const NumberFormatter = {
  vi: 'vi-VN',
  ko: 'ko-KR',
  en: 'en-US',
} as Record<string, string>;

const numberFormatter = () =>
  Intl.NumberFormat(NumberFormatter['en'], { minimumFractionDigits: 0 });

export default function NumberInput(props: Readonly<TextInputProps>) {
  const initialValue = props.form.getValues()[props.name]
    ? numberFormatter().format(props.form.getValues()[props.name])
    : '';

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, '');
    return numberFormatter().format(Number(digits));
  }, initialValue);

  function handleChange(realChangeFn: any, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, '');
    realChangeFn(Number(digits));
  }

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value ?? initialValue}
                hasError={Boolean(props.form.formState.errors[props.name])}
                maxLength={props.maxLength}
              />
            </FormControl>
            <FormMessage namespace={props.namespace} />
          </FormItem>
        );
      }}
    />
  );
}