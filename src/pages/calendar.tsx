import React from "react";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Page, Tabs } from "zmp-ui";
import BookingItem from "../components/book/booking";
import { bookingsState } from "../state";

const labels = {
  upcoming: "Sắp đến",
  finished: "Hoàn thành",
};
const data = JSON.parse(localStorage.getItem("myData"));
console.log(data);
function RenderData() {}
function CalendarPage() {
  const [status, setStatus] = useState<"upcoming" | "finished">("upcoming");
  const allBookings = useRecoilValue(bookingsState);

  const bookings = useMemo(() => {
    return allBookings.filter((b) => {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      if (status == "finished") {
        return b.bookingInfo && b.bookingInfo.date < startOfToday;
      } else {
        return !b.bookingInfo || b.bookingInfo.date >= startOfToday;
      }
    });
  }, [status, allBookings]);

  return (
    <Page className="min-h-0">
      <Tabs activeKey={status} onChange={setStatus as any}>
        {/* {["upcoming", "finished"].map((status) => ( */}
        <Tabs.Tab key={"upcoming"} label="Sắp đến">
          {(() => {
            if (bookings.length === 0) {
              return (
                <Box className="text-center" mt={10}>
                  Bạn chưa có booking nào sắp đến
                  {/* {status === "upcoming" ? "sắp đến" : "hoàn thành"}! */}
                </Box>
              );
            } else {
              return (
                <>
                  {bookings.map((booking) => (
                    <Box key={booking.id} my={4}>
                      <BookingItem booking={booking} />
                    </Box>
                  ))}
                </>
              );
            }
          })()}
        </Tabs.Tab>
        <Tabs.Tab key={"finished"} label="Hoàn thành">
          {(() => {
            if (!data) {
              return (
                <Box className="text-center" mt={10}>
                  Bạn chưa có booking nào hoàn thành
                  {/* {status === "upcoming" ? "sắp đến" : "hoàn thành"}! */}
                </Box>
              );
            } else {
              return (
                <>
                  {bookings.map((booking) => (
                    <Box key={booking.id} my={4}>
                      <BookingItem booking={booking} />
                    </Box>
                  ))}
                </>
              );
            }
          })()}
        </Tabs.Tab>
        {/* ))} */}
      </Tabs>
    </Page>
  );
}

export default CalendarPage;
