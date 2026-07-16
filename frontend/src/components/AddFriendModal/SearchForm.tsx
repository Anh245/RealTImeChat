import React from 'react'
import type { Field, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { IFormValue } from '../chat/AddFriendModal'
import { Label } from "@/components/ui/label"
import { Input } from '../ui/input';


interface SearchFormProps{
  register: UseFormRegister<IFormValue>;
  errors : FieldErrors<IFormValue>;
  loading: boolean;
  usernameValue: string;
  isFound:boolean | null;
  searchedUsername: string;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;

}
const SearchForm = ({
  register,
  errors,
  loading,
  usernameValue,
  isFound,
  searchedUsername,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}  className="space-y-4">
      <div className="space-y-2">
            <Label htmlFor='username' className='text-sm font-semibold'>
               Tìm bằng username
            </Label>
            <Input id="username"
            placeholder='Gõ tên username vào đây nè...'
            className='glass border-border/50'></Input>
      </div>


    </form>
  )
}

export default SearchForm
