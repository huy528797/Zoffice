import { FC, ReactNode, useState } from "react";
import { Box, Button, Sheet, Text, Modal, Tabs } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import Price from "../components/format/price";
import { useBookingTotal } from "../hooks";
import Time from "../components/format/time";
import CartItem from "../components/cart/cart-item";
import React from "react";
import { Booking } from "../models";
import { createPortal } from "react-dom";
import { Restaurant } from "../models";

const { Title } = Text;

function Section({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <>
      <Box m={0} flex justifyContent="space-between" alignItems="center">
        <Title size="small" className="mx-6 my-4">
          {left}
        </Title>
        <Title size="small" className="mx-6 my-4">
          {right}
        </Title>
      </Box>
      <hr />
    </>
  );
}
const BookingDetail: FC<{
  children: (open: () => void) => ReactNode;
  booking: Booking;
}> = ({ children, booking }) => {
  const [total] = useBookingTotal(booking);
  const [visible, setVisible] = useState(false);

  const [dialogChooseDish, setDialogChooseDish] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log("location", location);
  // const handleOpenChooseDish = () => {
  //   console.log('aaaaaaaaaa')
  //   navigate("/restaurant", {state :{key: "value"}});
  // }

  return (
    <>
      {children(() => setVisible(true))}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)}>
          {booking && (
            <>
              <Box
                className="swiper-handler"
                p={4}
                flex
                justifyContent="center"
              >
                <Title size="small" className="font-semibold">
                  {booking.bookingInfo ? "Thông tin đặt bàn" : "Pizza"}
                </Title>
              </Box>
              <hr />
              <div className="swiper-handler">
                {booking.bookingInfo && (
                  <>
                    <Section
                      left="Ngày, giờ"
                      right={
                        <>
                          {booking.bookingInfo.date.toLocaleDateString()} -{" "}
                          <Time time={booking.bookingInfo.hour} />
                        </>
                      }
                    />
                    <Section left="Bàn số" right={booking.bookingInfo.seats} />
                    <Section left="Số ghế" right={booking.bookingInfo.table} />
                  </>
                )}
                <Section left="Chi tiết" right={<Price amount={total} />} />
              </div>
              {booking.cart && booking.cart.items.length ? (
                <Box
                  m={0}
                  p={2}
                  className="overflow-y-auto"
                  style={{
                    maxHeight: `calc(50vh - ${
                      booking.bookingInfo ? 54 * 4 : 0
                    }px)`,
                    minHeight: 120,
                  }}
                >
                  {booking.cart.items.map((item, i) => (
                    <CartItem key={i} item={item} />
                  ))}
                </Box>
              ) : (
                <Box my={4} flex justifyContent="center">
                  <Button
                    onClick={() => {
                      navigate({
                        pathname: "/restaurant",
                        search: new URLSearchParams({
                          id: String(booking.restaurant.id),
                        }).toString(),
                      });
                    }}
                  >
                    Chọn thực đơn
                  </Button>
                </Box>
              )}
              <hr />
              <Box className="m-6 mt-4">
                <Button
                  onClick={() => setVisible(false)}
                  variant="secondary"
                  fullWidth
                >
                  Huỷ
                </Button>
              </Box>
            </>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};

export default BookingDetail;
