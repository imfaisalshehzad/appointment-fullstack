import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Dialog, Transition} from '@headlessui/react'

import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Title,
    Badge, Button, TextInput,
} from "@tremor/react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

function UserListing() {
    const [state, setState] = useState()
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    const fetchData = ()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND + '/user').then((res) => {
            setState(res.data);
        })
    }
    useEffect(() => {
        fetchData()
    }, []);
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });
    const onSubmit = async data => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND + '/user/', {
                name: data.name,
                email: data.email,
                password: data.password,
            });
            if (res.status != 201) {
                toast(res.data.message)
            } else {
                setIsOpen(false)
                toast.success('Successfully toasted!')
                fetchData()
            }
        } catch (e) {
            toast(e.message)
        }
    }

    return (
        <main className="!mt-20 main_page">
            <Card>
                <div className="flex justify-between">
                    <Title>List Users</Title>
                    <Button size="xs" onClick={() => setIsOpen(true)}>
                        Add New
                    </Button>
                </div>
                <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Role</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state?.map((item) => (
                            <TableRow key={item.email}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Text>{item.email}</Text>
                                </TableCell>
                                <TableCell>
                                    <Badge color="emerald">
                                        {item.role}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add New
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mt-5">
                                            <div className="mb-2">
                                                <label htmlFor="">Name</label>
                                                <TextInput name="name" placeholder="" {...register("name")}/>
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="">Email</label>
                                                <TextInput name="email" placeholder="" {...register("email")}/>
                                            </div>
                                            <div className="mt-5">
                                                <label htmlFor="">Password</label>
                                                <TextInput name="password" type="password" placeholder="" {...register("password")}/>
                                            </div>

                                        </div>

                                        <div className="mt-5">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </main>
    )
}

export default UserListing
