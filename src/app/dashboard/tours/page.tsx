"use client";
import TourCard from "@/app/ui/tours/tourCards";
import { getAllTours } from "@/lib/services";
import { TextField, debounce } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';


const Tours: React.FC = () => {
  const [allTours, setAllTours] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>(allTours);
  const [loading, setLoading] = useState(false);

  const showLoader = () => {
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const handleSearch = debounce((value: string) => {
    const FilteredCards = allTours.filter((tours) =>
      tours.tourShortDescription.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCards(FilteredCards);
  }, 300);

  useEffect(() => {
    const getTours = async () => {
      showLoader() 
      let res = await getAllTours();
      setAllTours(res);
      setFilteredCards(res);
      hideLoader()
    };
    if (allTours.length === 0)getTours();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
      <TextField
        label="Search by name"
        variant="standard"
        onChange={handleInputChange}
        className="my-2 px-4 ml-4"
        InputProps={{ style: { color: 'white' } }}
        InputLabelProps={{ style: { color: 'white' } }}
      />
      </div>
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-35"><CircularProgress /></div>} 
      <div className="grid md:grid-cols-3 gap-5">
        {filteredCards.map((tours,i) => (
          <TourCard {...tours} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Tours;
