import SideBar from '../_components/SideBar';
import Nav from '../_components/Nav';
import ManageBookingC from './_components/ManageBookingC';

export default function ManageBookingPage() {
  return (
    <div className="relative min-h-screen bg-gray-50" style={{backgroundColor: '#f9fafb'}}>
      <Nav isMain={false} value="My Booking"/>
      <SideBar />
      <div className="pt-5 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <ManageBookingC type="primary" />
        </div>
      </div>
    </div>
  );
}