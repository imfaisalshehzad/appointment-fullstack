import {Fragment, useEffect, useState} from "react";
import axios from "axios";
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
import {Dialog, Transition} from "@headlessui/react";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

function Listing() {
    const [state, setState] = useState()
    let [isOpen, setIsOpen] = useState(false)
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            start_timeslot: '',
            end_timeslot: '',
        }
    });
    useEffect(() => {
        fetchData()
    }, []);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const fetchData = () => {
        axios.get(process.env.NEXT_PUBLIC_BACKEND + '/appointment').then((res) => {
            setState(res.data);
        })
    }
    const onSubmit = async data => {
        try {
            // console.log('=========', data);
            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND + '/appointment/', data);
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
                    <Title>List Appointments</Title>
                    <Button size="xs" onClick={() => setIsOpen(true)}>
                        Add New
                    </Button>
                </div>
                <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Start</TableHeaderCell>
                            <TableHeaderCell>End</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Text>{new Date(item.start_timeslot).toLocaleString()}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{new Date(item.end_timeslot).toLocaleString()}</Text>
                                </TableCell>
                                <TableCell>
                                    <Badge color="emerald">
                                        Booked
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
                                                <label htmlFor="">Start</label>
                                                <TextInput name="start_timeslot"
                                                           placeholder="" {...register("start_timeslot")} type="time"/>
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="">End</label>
                                                <TextInput name="end_timeslot"
                                                           placeholder="" {...register("end_timeslot")} type="time"/>

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

export default Listing
