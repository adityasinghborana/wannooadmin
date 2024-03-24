"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";


const TourCard: React.FC = (tour:any) => {

    useEffect(()=>{
        console.log(tour)
    },[])
    return (
        <div className="bg-slate-600">
        <Link href={`/details/${tour.id}`} style={{ textDecoration: 'none' }} className="flex items-center justify-center ">
          <Card className="w-full h-96">
            <img src={tour?.tourdetails[0]?.imagePath} alt="Card" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '4px 4px 0 0' }} />
            <CardContent>              
            <Typography variant="body2" component="div" className="font-bold">
                {tour.id}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">          
                {tour.tourName}
            </Typography>
              <Typography variant="body2" color='text.secondary' className="line-clamp-6">
                {tour?.tourShortDescription}
              </Typography>
            </CardContent>
          </Card>
         </Link>
        </div>        
      );
    };

export default TourCard;
