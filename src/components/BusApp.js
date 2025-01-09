import React, { useState, useRef } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';

// Car Image Carousel Component
const CarImageCarousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swiped left
      nextImage();
    } else {
      // Swiped right
      previousImage();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative">
        {/* Main Image with Touch Events */}
        <div 
          className="aspect-[2/1] relative bg-gray-200 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentImage]}
            alt={`Car View ${currentImage + 1}`}
            className="w-full h-full object-cover select-none"
            draggable="false"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={previousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentImage === index ? 'bg-blue-600' : 'bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Driver Details Component
const DriverDetails = ({ onBack, driver }) => {
  const [selectedTrips, setSelectedTrips] = useState('');
  
  const driverData = {
    name: driver.name,
    age: driver.age,
    experience: driver.experience,
    pickupLocations: driver.pickupLocations,
    destinations: driver.destinations,
    averagePrice: driver.tripPrice,
    image: driver.image,
    car: {
      brand: driver.carModel.split(' ')[1],
      model: driver.carModel.split(' ')[0],
      totalSeats: driver.totalSeats,
      availableSeats: driver.availableSeats,
      wifi: true
    },
    carImages: driver.carImages
  };

  const handleTripSelection = (e) => {
    setSelectedTrips(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack} 
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-6">Driver Details:</h2>

      {/* Driver Information */}
      <div className="space-y-6">
        {/* Driver Photo and Personal Details */}
        <div className="flex gap-4">
          {/* Driver Photo */}
          <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
            <img
              src="\driver-images\driver1.png"
              alt="Driver"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Personal Details */}
          <div className="space-y-2">
            <div>Name: {driverData.name}</div>
            <div>Age: {driverData.age}</div>
            <div>Experience: {driverData.experience}</div>
            <div>Can Pick Up From: {driverData.pickupLocations.join(', ')}</div>
            <div>Can Drive to: {driverData.destinations.join(', ')}</div>
            <div>Average Price Per Trip: {driverData.averagePrice} SAR</div>
          </div>
        </div>

        {/* Car Details */}
        <div>
          <h3 className="font-semibold mb-2">Car Details:</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div>Brand Name: {driverData.car.brand}</div>
              <div>Model: {driverData.car.model}</div>
              <div>Total Seats: {driverData.car.totalSeats}</div>
              <div>Available Seats: {driverData.car.availableSeats}</div>
              <div>Wifi onboard: {driverData.car.wifi ? 'Yes' : 'No'}</div>
            </div>
            
            {/* Car Images Carousel */}
            <CarImageCarousel images={driverData.carImages} />
          </div>
        </div>

        {/* Trip Packages */}
        <div>
          <h3 className="font-semibold mb-2">Number of Trips to Book:</h3>
          <div className="border rounded-lg p-4 space-y-4">
            <select 
              value={selectedTrips} 
              onChange={handleTripSelection}
              className="w-full p-2 border rounded"
            >
              <option value="">Select number of trips</option>
              <option value="20">20 trips</option>
              <option value="40">40 trips</option>
              <option value="60">60 trips</option>
            </select>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div>• Each trip is from and back to same origin</div>
              <div>• If a trip is missed by driver, it will be refunded</div>
              <div>• If missed by the student it will NOT be refunded</div>
              <div>A trip is only valid for one day</div>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <button 
          className={`w-full py-3 rounded-lg transition-colors mt-6 ${
            selectedTrips 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!selectedTrips}
          onClick={() => {
            if (selectedTrips) {
              window.location.href = "https://wa.link/fdidxy";
            }
          }}
        >
          Book This Driver
        </button>
      </div>
    </div>
  );
};

// Bus Driver Finder Component
const BusDriverFinder = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const dateInputRef = useRef(null);

  // Sample driver data
  const initialDrivers = [
    {
      id: 1,
      name: 'Ali',
      age: 55,
      experience: '15 years',
      image: '\driver-images\driver1.png',
      pickupLocations: ['Olayya', 'Yasmeen', 'Malga'],
      destinations: ['Nora Uni', 'Imam Uni', 'King Saud Uni'],
      carModel: '2023 Toyota Hiace',
      totalSeats: 14,
      availableSeats: 6,
      tripPrice: 45,
      minBookings: 20,
      carImages: [
        "\car-images\car1.png",
        "\car-images\car2.png",
        "\car-images\car3.png",
        "\car-images\car4.png"
      ]
    },
    {
      id: 2,
      name: 'Ahmad',
      age: 47,
      experience: '13 years',
      image: '/image2.jpg',
      pickupLocations: ['Narjes', 'Malga'],
      destinations: ['Imam Uni', 'King Saud Uni'],
      carModel: '2022 Toyota Coaster',
      totalSeats: 23,
      availableSeats: 12,
      tripPrice: 50,
      minBookings: 20,
      carImages: [
        "\car-images\car1.png",
        "\car-images\car2.png",
        "\car-images\car3.png",
        "\car-images\car4.png"
      ]
    },
    {
      id: 3,
      name: 'Khalid',
      age: 61,
      experience: '27 years',
      image: '/image3.jpg',
      pickupLocations: ['Olayya', 'Yasmeen'],
      destinations: ['Nora Uni'],
      carModel: '2021 Toyota Hiace',
      totalSeats: 14,
      availableSeats: 8,
      tripPrice: 40,
      minBookings: 20,
      carImages: [
        "\car-images\car1.png",
        "\car-images\car2.png",
        "\car-images\car3.png",
        "\car-images\car4.png"
      ]
    }
  ];

  const [drivers, setDrivers] = useState(initialDrivers);
  const origins = ['Malga', 'Olayya', 'Narjes', 'Yasmeen'];
  const destinations = ['Noura University', 'King Saud University', 'Imam University'];

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
      dateInputRef.current.click();
    }
  };

  const handleSearch = () => {
    if (!selectedOrigin || !selectedDestination) {
      return;
    }

    const filtered = initialDrivers.filter(() => Math.random() > 0.5);
    setDrivers(filtered);
  };

  const handleBack = () => {
    setSelectedDriver(null);
  };

  if (selectedDriver) {
    return <DriverDetails onBack={handleBack} driver={selectedDriver} />;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white">
      {/* Header */}
      <div className="text-xl font-bold mb-6 text-center">Find a Bus Driver</div>

      {/* Search Form */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="space-y-4">
          {/* Origin and Destination */}
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">From</option>
                {origins.map((origin) => (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1">
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">To</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Selection */}
          <div 
            className="relative cursor-pointer"
            onClick={handleDateClick}
          >
            <input
              ref={dateInputRef}
              type="date"
              value={startDate}
              onChange={handleDateChange}
              min={today}
              className="w-full p-2 border rounded pl-8 appearance-none cursor-pointer"
              style={{
                colorScheme: 'light',
                '-webkit-appearance': 'none',
                'appearance': 'none',
                'background-color': 'white',
                color: startDate ? 'inherit' : 'transparent'
              }}
            />
            <Calendar className="absolute left-2 top-2 text-gray-400" size={20} />
            <div className={`absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none ${
              startDate ? 'text-transparent' : 'text-gray-500'
            }`}>
              Select start date
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!selectedOrigin || !selectedDestination}
            className={`w-full py-2 rounded transition-colors ${
              selectedOrigin && selectedDestination
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Search
          </button>
        </div>
      </div>

      {/* Driver Cards */}
      <div className="space-y-4">
        {drivers.map((driver) => (
          <div 
            key={driver.id} 
            className="border rounded-lg p-4 shadow cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => setSelectedDriver(driver)}
          >
            <div className="flex items-start gap-4">
              {/* Driver Image Placeholder */}
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="\driver-images\driver1.png"
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Driver Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>Name: {driver.name}</div>
                  <div>
                    <div className="text-sm text-gray-600 text-center mb-1">Trip Price</div>
                    <div className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full font-medium text-center">
                      {driver.tripPrice} SAR
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div>Car Model: {driver.carModel}</div>
                  <div>Capacity: {driver.totalSeats} seats</div>
                  <div>Remaining Seats: {driver.availableSeats}</div>
                  <div>Minimum Booking Trips: {driver.minBookings}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusDriverFinder;