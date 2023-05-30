import Link from "next/link";

function SideBar() {
    return (
        <nav className="sidebar">
            <div className="sidebar-sticky">
                <h4 className="nav_title">Navigation</h4>
                <ul className="navbar-nav">
                    <li className="nav-item active"><Link href="/dashboard">Appointments</Link></li>
                    <li className="nav-item active"><Link href="/users">User</Link></li>
                </ul>
            </div>
        </nav>
    );
}
export default SideBar
