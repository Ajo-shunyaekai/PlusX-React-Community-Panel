import React from "react";
import style from "./DashboardCard.module.css";
import DashboardCardItem from "../../SharedComponent/DashboardCardItem/DashboardCardItem";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCardIndex } from "../../../store/dashboardSlice";

import PersonImage from "../../../assets/images/Person.svg";
import PublicChargersImage from "../../../assets/images/DashboardCardIcons/Total Public Chargers.svg";
import PODBooking from "../../../assets/images/DashboardCardIcons/POD Booking.svg";

// import AppSignUpImage from "../../../assets/images/DashboardCardIcons/Total App Sign Up.svg";
// import ChargerInstallationImage from "../../../assets/images/DashboardCardIcons/Charger Installation.svg";
// import EVRiderClubImage from "../../../assets/images/DashboardCardIcons/EV Rider Club.svg";
// import EVSpecializedShopsImage from "../../../assets/images/DashboardCardIcons/EV Specialized Shops.svg";
// import ActiveOfferImage from "../../../assets/images/DashboardCardIcons/Total Active Offer.svg";
// import EVBuyAndSellImage from "../../../assets/images/DashboardCardIcons/Total EV Buy & Sell.svg";
// import EVDiscussionBoardImage from "../../../assets/images/DashboardCardIcons/Total EV Discussion Board.svg";
// import EVGuideImage from "../../../assets/images/DashboardCardIcons/Total EV Guide.svg";
// import EVInsuranceImage from "../../../assets/images/DashboardCardIcons/Total EV Insurance.svg";
// import EVPreSalesImage from "../../../assets/images/DashboardCardIcons/Total EV Pre-Sales Testing.svg";
// import EVRoadAssitanceImage from "../../../assets/images/DashboardCardIcons/Total EV Road Assitance.svg";
// import ElectricBikeLeasingImage from "../../../assets/images/DashboardCardIcons/Total Electric Bike Leasing.svg";
// import ElectricCarLeasingImage from "../../../assets/images/DashboardCardIcons/Total Electric Car Leasing.svg";
// import NoOfRegsDriverImage from "../../../assets/images/DashboardCardIcons/No of Regs Driver.svg";
// import PickAndDropImage from "../../../assets/images/DashboardCardIcons/Total Pick & Drop.svg";
// import TotalRegisterYourInterestImage from "../../../assets/images/DashboardCardIcons/Total Register Your Intrest.svg";

const getCountFromDetails = (details, moduleName, directKey) => {
  if (details?.[directKey] !== undefined) {
    return details[directKey] || 0;
  }

  return details?.count_arr?.find((item) => item.module === moduleName)?.count || 0;
};

const DashboardCard = ({ details }) => {
  const dispatch = useDispatch();
  const activeCardIndex = useSelector((state) => state.dashboard.activeCardIndex);

  const handleCardClick = (index) => {
    dispatch(setActiveCardIndex(index));
  };

  const cardData = [
    {
      icon: PersonImage,
      count: getCountFromDetails(details, "Residents", "total_residents"),
      title: "Resident Count",
      route: "/community/resident-list",
    },
    {
      icon: PublicChargersImage,
      count: getCountFromDetails(details, "Chargers", "total_chargers"),
      title: "Charger Count",
      route: "/community/charger-list",
    },
    {
      icon: PODBooking,
      count: getCountFromDetails(details, "Charger Bookings", "total_charger_bookings"),
      title: "Charger Booking Count",
      route: "/community/booking-list",
    },
    // {
    //   icon: AppSignUpImage,
    //   count: getCountFromDetails(details, "App Sign Up", "total_app_signup"),
    //   title: "App Sign Up",
    //   route: "/app-signup/app-signup-list",
    // },
    // {
    //   icon: PODBooking,
    //   count: getCountFromDetails(details, "POD Bookings", "total_pod_bookings"),
    //   title: "POD Bookings",
    //   route: "/portable-charger/charger-booking-list",
    // },
    // {
    //   icon: PickAndDropImage,
    //   count: getCountFromDetails(details, "Pickup & Dropoff Bookings", "total_pickup_dropoff_bookings"),
    //   title: "Pick & Drop off Bookings",
    //   route: "/pick-and-drop/booking-list",
    // },
    // {
    //   icon: EVRoadAssitanceImage,
    //   count: getCountFromDetails(details, "EV Road Assistance", "total_ev_road_assistance"),
    //   title: "EV Roadside Assistance Bookings",
    //   route: "/ev-road-assistance/booking-list",
    // },
    // {
    //   icon: EVRoadAssitanceImage,
    //   count: getCountFromDetails(details, "EV Insurance Leads", "total_ev_insurance_leads"),
    //   title: "EV Insurance Leads",
    //   route: "/ev-insurance/ev-insurance-list",
    // },
    // {
    //   icon: ChargerInstallationImage,
    //   count: getCountFromDetails(details, "Charger Installation Bookings", "total_charger_installation_bookings"),
    //   title: "Charger Installation Bookings",
    //   route: "/charger-installation/charger-installation-list",
    // },
    // {
    //   icon: PODBooking,
    //   count: getCountFromDetails(details, "Today POD Failed Bookings", "total_pod_failed_bookings"),
    //   title: "Incomplete POD Bookings",
    //   route: "/portable-charger/failed-booking-list",
    // },
    // {
    //   icon: PickAndDropImage,
    //   count: getCountFromDetails(details, "Today Pickup & Dropoff Failed Bookings", "total_pickup_dropoff_failed_bookings"),
    //   title: "Incomplete Pick & Drop Off Bookings",
    //   route: "/pick-and-drop/failed-booking-list",
    // },
    // {
    //   icon: PickAndDropImage,
    //   count: getCountFromDetails(details, "Today Road Side Failed Bookings", "total_roadside_failed_bookings"),
    //   title: "Incomplete Roadside Assistance Bookings",
    //   route: "/ev-road-assistance/failed-booking-list",
    // },
    // {
    //   icon: NoOfRegsDriverImage,
    //   count: getCountFromDetails(details, "No. of Regs. Drivers", "total_drivers"),
    //   title: "Active Drivers",
    //   route: "/drivers/driver-list",
    // },
    // {
    //   icon: ChargerInstallationImage,
    //   count: getCountFromDetails(details, "EV Chargers Booking", "total_ev_chargers_booking"),
    //   title: "EV Chargers Booking",
    //   route: "/charger-installation/ev-charger-booking-list",
    // },
    // {
    //   icon: ChargerInstallationImage,
    //   count: getCountFromDetails(details, "EV Accessories Booking", "total_ev_accessories_booking"),
    //   title: "EV Accessories Booking",
    //   route: "/charger-installation/ev-accessories-booking-list",
    // },
    // {
    //   icon: EVPreSalesImage,
    //   count: getCountFromDetails(details, "Charger Share List", "total_charger_share_list"),
    //   title: "Charge Share Listing Requests",
    //   route: "/charger-share/request-list",
    // },
  ];

  return (
    <div className={style.dashboardCardItem}>
      {cardData.map((data, index) => (
        <DashboardCardItem
          key={index}
          icon={data.icon}
          count={data.count}
          title={data.title}
          route={data.route}
          isActive={activeCardIndex === index}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default DashboardCard;
