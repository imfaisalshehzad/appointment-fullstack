import {Inter} from 'next/font/google'
import Header from "../components/Header";
import Login from "../components/Login";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Header/>
            <Login/>
        </>
    )
}
