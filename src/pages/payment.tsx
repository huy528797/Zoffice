import React from "react";
import { useState } from "react";
import { useRestaurant } from "../hooks";
import { Box, Button, Icon, Text, Modal } from "zmp-ui";
import DistrictName from "../components/district-name";
import Distance from "../components/distance";
import { useRecoilValue } from "recoil";
import FoodPicker from "../pages/food-picker";
import CartItem from "../components/cart/cart-item";
import { cartState, totalState } from "../state";
import Price from "../components/format/price";
import Time from "../components/format/time";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

const { Title } = Text;

function CartDetail() {
  const cart = useRecoilValue(cartState);
  // const navigate = useNavigate();
  const total = useRecoilValue(totalState);
  // const edit = (i: number) => {
  //   navigate({
  //     pathname: "/food-picker",
  //     search: new URLSearchParams({
  //       cartItemIndex: String(i),
  //     }).toString(),
  //   });
  //   setTimeout(() => {
  //     document.querySelector(".sheet-backdrop")?.classList.add("backdrop-in");
  //   }, 300); // workaround for backdrop not showing
  // };

  return (
    <div className="zaui-page">
      <Box
        m={0}
        p={2}
        pt={3}
        className="overflow-y-auto"
        style={{ maxHeight: "50vh" }}
      >
        {cart.items.map((item, i) => (
          <FoodPicker key={i} cartItemIndex={i}>
            {(open) => <CartItem item={item} onEdit={open} />}
          </FoodPicker>
        ))}
      </Box>
      <Box
        className="swipe-handler"
        m={0}
        px={6}
        flex
        justifyContent="space-between"
      >
        <Title size="small">Tổng thanh toán</Title>
        <Text className="ml-6 text-secondary font-semibold" size="xLarge" bold>
          <Price amount={total} />
        </Text>
      </Box>
    </div>
  );
}

function PayMentPage() {
  const restaurant = useRestaurant();
  const [popupVisible, setPopupVisible] = useState(false);
  const getlocal = localStorage.getItem("paymentBook");
  let loai_ban;
  let so_ghe;
  let ngay;
  let gio;
  let id_book;
  const objItem = JSON.parse(getlocal);
  if (getlocal) {
    loai_ban = objItem.bookingInfo.table;
    so_ghe = objItem.bookingInfo.seats;
    ngay = moment(new Date(objItem.bookingInfo.date).getTime()).format(
      "DD-MM-YYYY"
    );
    gio = objItem.bookingInfo.hour;
    id_book = objItem.id;
  }
  const handclickPayment = () => {
    setPopupVisible(true);
    const data = {
      so_ghe: so_ghe,
      loai_ban: loai_ban,
      ngay: ngay,
      gio: gio,
      image: restaurant?.image,
      rating: restaurant?.rating,
      name: restaurant?.name,
      districtID: restaurant?.districtId,
      vi_tri: restaurant?.location,
      id: id_book,
    };
    localStorage.setItem("myData", JSON.stringify(data));
  };
  const navigate = useNavigate();
  const ClosePayment = () => {
    localStorage.removeItem("paymentBook");
    setPopupVisible(false);
    console.log("cvvcvcvcvc");
    navigate("/");
  };
  return (
    <div className="zaui-page">
      {(() => {
        if (!getlocal) {
          return <div>ddddd</div>;
        } else {
          return (
            <Box>
              <div>
                <h1>Thông tin đặt bàn</h1>
              </div>
              <div className="aspect-cinema relative w-full">
                <img
                  src={restaurant?.image}
                  className="absolute w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-3 top-3 py-1 px-3 space-x-1 flex items-center font-semibold text-sm text-white bg-primary rounded-full">
                <Icon
                  icon="zi-star-solid"
                  className="text-yellow-400"
                  size={16}
                />
                <span>{restaurant?.rating}</span>
              </div>
              <Title size="small" className="mt-2 mb-0 mx-4">
                {restaurant?.name}
              </Title>

              <Box flex mt={0} mb={2}>
                <Button
                  className="text-red-500"
                  prefixIcon={
                    <Icon className="text-red-500" icon="zi-location-solid" />
                  }
                  size="small"
                  variant="tertiary"
                >
                  <span className="text-gray-500">
                    <DistrictName id={restaurant?.districtId} />
                  </span>
                </Button>
                <Button
                  prefixIcon={<Icon icon="zi-send-solid" />}
                  size="small"
                  variant="tertiary"
                >
                  <span className="text-gray-500">
                    <Distance location={restaurant?.location} />
                  </span>
                </Button>
              </Box>

              <Box>
                <Title size="small" className="mt-2 mb-0 mx-4">
                  {loai_ban} - {so_ghe} ghế
                </Title>
                <Title size="small" className="mt-2 mb-0 mx-4">
                  {ngay} - <Time time={gio} />
                </Title>
              </Box>
              <hr />
              <Title size="small" className="mx-6 my-4">
                Thông tin thực đơn
              </Title>
              <hr />
              <CartDetail />
              <hr />
              <Button
                className="zaui-btn zaui-btn-primary zaui-btn-large zaui-btn-full-width rounded-xl"
                variant="secondary"
                fullWidth
                onClick={handclickPayment}
              >
                Thanh toán
              </Button>

              <Modal
                visible={popupVisible}
                className="zaui-text text-center"
                title="Thông báo"
                description="Bạn thanh toán thành công"
              >
                <Box
                  p={6}
                  className="zaui-box zaui-box-mb-0 zaui-box-flex zaui-box-justify-center "
                >
                  <Button onClick={ClosePayment} fullWidth>
                    Xác nhận
                  </Button>
                </Box>
              </Modal>
            </Box>
          );
        }
      })()}
    </div>
  );
}
export default PayMentPage;
