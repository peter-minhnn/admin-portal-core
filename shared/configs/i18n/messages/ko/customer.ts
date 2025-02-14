const CustomerMessages = {
  title: '회원관리',
  description:
    '모바일 앱에서 등록된 모든 회원정보를 관리하고 업데이트 페이지입니다.',
  errors: {
    phoneRequired: '전화번호를 입력하세요',
    onlyNumber: '숫자만 입력하세요',
    emailRequired: '이메일을 입력하세요',
    invalidEmail: '유효한 이메일을 입력하세요',
    firstNameRequired: '이름을 입력하세요',
    lastNameRequired: '성을 입력하세요',
    genderRequired: '성별을 입력하세요',
    addressRequired: '주소를 입력하세요',
  },
  email: '이메일',
  firstName: '이름',
  lastName: '성',
  address: '주소',
  phoneNumber: '전화번호',
  gender: '성별',
  birthDate: '생년월일',
  avatar: '아바타',
  actions: '작업',
  editCustomerModalTitle: '회원정보 업데이트',
  status: '상태',
  notifications: {
    updateCustomerSuccess: '회원정보가 성공적으로 업데이트되었습니다',
    updateCustomerError: '회원정보 업데이트에 실패했습니다',
    resetCustomerPasswordSuccess:
      '회원 비밀번호 재설정이 성공적으로 완료되었습니다',
    resetCustomerPasswordError: '회원 비밀번호 재설정에 실패했습니다',
  },
  male: '남성',
  female: '여성',
  other: '기타',
  active: '활성화',
  inactive: '비활성화',
  editStatusCustomerModalTitle: '상태 업데이트',
  currentPassword: '현재 비밀번호',
  newPassword: '새 비밀번호',
  resetPasswordAlertTitle: '비밀번호 재설정',
  resetPasswordAlertContent:
    '이메일이 {email}인 회원의 비밀번호를 재설정하시겠습니까?',
  createUser: '회원 추가',
};

export default CustomerMessages;
