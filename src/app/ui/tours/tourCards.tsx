"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material";
import { FC } from "react";

const TourCard: FC = (tour: any) => {
  return (
    <div className="cursor-pointer">
      {/* <Link
        href={`/dashboard/tours/${tour.tourId}`}
        style={{ textDecoration: "none" }}
        className="flex items-center justify-center rounded-3xl"
      > */}
        <Card className="w-full h-96 rounded-3xl">
          <img
            src={tour?.tourdetails[0]?.imagePath}
            alt="Card"
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: "4px 4px 0 0",
            }}
          />
          <CardContent className="mb-2">
            <Typography variant="body2" component="div" className="font-bold">
              {tour.tourId}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" className="truncate">
              {tour.tourName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="line-clamp-2 h-10"
            >
              {tour?.tourShortDescription}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" className="hover:bg-blue-600 hover:text-white rounded-2xl">View</Button>
            <Button size="small" className="hover:bg-yellow-600 hover:text-white rounded-2xl text-yellow-600">Edit</Button>
            <Button size="small" className="hover:bg-red-600 hover:text-white rounded-2xl text-red-600">Delete</Button>
          </CardActions>
        </Card>
      {/* </Link> */}
    </div>
  );
};

export default TourCard;
