export interface EventDetail {
  id: number;
  eventName: string;
  eventdetailid: number;
  description: string;
  date: string;
  location: string;
  googlemapurl: string;
  minage: number;
  moreinfo: string;
  ticketinfo: string;
  artistname: string;
  artistimage: string;
  lastbookingtime: string;
  eventSelling: boolean;
  ischildallowed: boolean;
  isadultallowed: boolean;
  isinfantallowed: boolean;
  duration: string;
  vendorUid: string;
}

export interface Event {
  id: number;
  isVisible: boolean;
  isVisibleHome: boolean;
  cityId: number;
  eventName: string;
  duration: string;
  imagePath: string;
  eventType: string;
  isSlot: boolean;
  onlyChild: boolean;
  vendorUid: string;
  recommended: boolean;
  eventdetailid: number | null;
  eventdetail: EventDetail[];
}
