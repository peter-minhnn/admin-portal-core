const ProductMessages = {
  title: '제품 목록',
  description:
    '제품 페이지는 특정 제품에 대한 자세한 정보를 제공하도록 설계된 전자 상거래 웹사이트의 중요한 구성 요소입니다.',
  productCode: '제품 코드',
  productName: '제품명',
  productDesc: '제품 설명',
  unitCode: '단위',
  productImage: '이미지',
  productPrice: '가격',
  productMinQty: '최소 수량',
  productMaxQty: '최대 수량',
  modalSaveBtn: '저장',
  modalCancelBtn: '취소',
  selectUnitCode: '단위 선택',
  addProductModalTitle: '제품 추가',
  selectProductTypeCode: '제품 유형 선택',
  productType: '제품 유형',
  notifications: {
    addProductSuccess: '제품이 성공적으로 추가되었습니다',
    addProductError: '제품 추가에 실패했습니다',
    updateProductSuccess: '제품이 성공적으로 업데이트되었습니다',
    updateProductError: '제품 업데이트에 실패했습니다',
    deleteProductSuccess: '제품이 성공적으로 삭제되었습니다',
    deleteProductError: '제품 삭제에 실패했습니다',
    updateProductPriceSuccess: '제품 가격 업데이트 성공',
    updateProductPriceError: '제품 가격 업데이트 실패',
    addOrderSuccess: 'Thêm đơn hàng thành công',
    addOrderError: 'Thêm đơn hàng thất bại',
    updateOrderSuccess: 'Cập nhật đơn hàng thành công',
    updateOrderError: 'Cập nhật đơn hàng thất bại',
    deleteOrderSuccess: 'Xóa đơn hàng thành công',
    deleteOrderError: 'Xóa đơn hàng thất bại',
    approveOrderSuccess: 'Phê duyệt đơn hàng thành công',
    approveOrderError: 'Phê duyệt đơn hàng thất bại',
    getOrderDetailError: 'Lấy chi tiết đơn hàng thất bại',
    updateProductStatusQuestion:
      'Bạn có muốn thay đổi tình trạng mã sản phẩm "{bOpen}{productName} ({productCode}){bClose}"',
    exportExcelSuccess: 'Xuất dữ liệu thành công',
    exportExcelError: 'Xuất dữ liệu thất bại',
  },
  deleteProductModalTitle: '제품 삭제',
  deleteProductModalDesc: '이 제품을 삭제하시겠습니까?',
  deleteProductModalContent: '{productName} 제품을 삭제하고 있습니다',
  modalDeleteBtn: '삭제',
  editProductModalTitle: '제품 수정',
  advancedFilters: '고급 필터',
  content: '내용',
  priceSell: '판매 가격',
  originalPrice: '원래 가격',
  updateProductPrice: '제품 가격 업데이트',
  errors: {
    price: '제품 가격을 입력해주세요',
    wrongInputNumberType: '숫자를 입력해주세요',
    productType: '제품 유형을 선택해주세요',
    productName: '제품명을 입력해주세요',
    unitCode: '단위를 선택해주세요',
    productPrice: '제품 가격을 입력해주세요',
    onlyNumber: '숫자를 입력해주세요',
    productMinQty: '최소 수량을 입력해주세요',
    productMaxQty: '최대 수량을 입력해주세요',
    priceNotGreaterThanProductPrice: '판매 가격은 제품 가격보다 클 수 없습니다',
    orders: {
      customerIdRequired: '고객을 선택해주세요',
      totalAmountRequired: '총 수량을 입력해주세요',
      totalPriceRequired: '총 가격을 입력해주세요',
      deliveryTypeRequired: '배송 유형을 선택해주세요',
      orderStatusRequired: '주문 상태를 선택해주세요',
      paymentStatusRequired: '결제 상태를 선택해주세요',
      quantityRequired: '수량을 입력해주세요',
      deliveryAddressRequired: '배송 주소를 입력해주세요',
      remainQtyRequired: '남은 수량을 입력해주세요',
      priceRequired: '가격을 입력해주세요',
      orderDetailsRequired: '주문 정보를 입력해주세요',
      productCodeRequired: '제품 코드를 선택해주세요',
      addOrderSuccess: 'Thêm đơn hàng thành công',
      addOrderError: 'Thêm đơn hàng thất bại',
      updateOrderSuccess: 'Cập nhật đơn hàng thành công',
      updateOrderError: 'Cập nhật đơn hàng thất bại',
      deleteOrderSuccess: 'Xóa đơn hàng thành công',
      deleteOrderError: 'Xóa đơn hàng thất bại',
      approveOrderSuccess: 'Phê duyệt đơn hàng thành công',
      approveOrderError: 'Phê duyệt đơn hàng thất bại',
      approveReasonRequired: 'Vui lòng nhập lý do phê duyệt',
      cannotDeleteOrderApproved: '이 주문은 승인되었으므로 삭제할 수 없습니다',
    },
  },
  actions: 'Hành Động',
  productPriceTitle: '제품 가격 목록',
  editProductPrice: '제품 가격 수정',
  productPriceDescTitle: '제품 가격 관리',
  isActive: '활성화',
  using: '사용 중',
  notUsing: '사용 안 함',
  selectedProductPlaceholder: '제품 선택',
  productPriceHistory: '제품 가격 이력',
  updatePriceDateTime: '가격 업데이트 시간',
  orders: {
    title: '주문 목록',
    description:
      '주문 페이지는 고객이 제품을 주문할 때 생성되는 주문 정보를 제공하는 전자 상거래 웹사이트의 중요한 구성 요소입니다.',
    orderCode: '주문 코드',
    orderDate: '주문 날짜',
    customerId: '고객 ID',
    fromDate: '시작 날짜',
    toDate: '종료 날짜',
    deliveryType: '배송 유형',
    orderStatus: '주문 상태',
    paymentStatus: '결제 상태',
    totalAmount: '총 수량',
    totalPrice: '총 가격',
    discountAmount: '할인 금액',
    discountPercent: '할인 비율',
    approveBy: '승인자',
    approveAt: '승인 시간',
    approvedDesc: '승인 설명',
    deliveryAddress: '배송 주소',
    selectFromDate: '시작 날짜 선택',
    selectToDate: '종료 날짜 선택',
    selectDeliveryType: '배송 유형 선택',
    selectOrderStatus: '주문 상태 선택',
    selectPaymentStatus: '결제 상태 선택',
    selectCustomer: '고객 선택',
    orderCodePlaceholder: '주문 코드',
    addOrderModalTitle: '주문 추가',
    updateOrderModalTitle: '주문 업데이트',
    orderDetailForm: '주문 정보',
    quantity: '수량',
    remainQty: '남은 수량',
    deleteProductDetailRow: '주문에서 {productCode} 제품 삭제',
    productOrderDetailForm: '제품 주문 정보',
    approveOrderModalTitle: '주문 승인',
    deleteOrderModalTitle: '주문 삭제',
    deleteOrderModalDesc: '이 주문을 삭제하시겠습니까?',
    deleteOrderModalContent: '{orderCode} 주문을 삭제하고 있습니다',
    approveOrderModalContent: '{orderCode} 주문을 승인하고 있습니다',
    approveReason: '승인 이유',
    approveReasonPlaceholder: '승인 이유 입력',
    approved: '승인',
    rejected: '거부',
    contactName: '연락처',
    contactNumber: '전화번호',
    updateOrderModalContent: '주문 {orderCode}을(를) 업데이트하고 있습니다',
    calculatorTotalPrices: 'Tạm tính',
    exportExcel: 'Export',
    approvedBy: 'Người duyệt',
    approvedAt: 'Ngày duyệt',
    customerName: '고객명',
  },
  productStatus: '제품 상태',
  updateProductStatusTitle: '제품 상태 변경',
};

export default ProductMessages;
