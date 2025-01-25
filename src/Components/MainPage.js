import CardsLayout from "./CardsLayout";
import NavBar from "./Navbar";
import OurGuest from "./OurGuest";
import OurServices from "./OurServices";
import OurVision from "./OurVision";

export default function MainPage() {
  return (
    <div>
      <div className="min-h-screen">
        <NavBar />
        <div className="bg-gray-100">
          <OurVision />
          <div className="p-6">
            <CardsLayout />
            <OurGuest />
            <OurServices />
          </div>
        </div>
      </div>
    </div>
  );
}
