'use client';

import React, { ReactElement, useMemo } from 'react';
import Image from 'next/image';

const PolicyPage: React.FC = () => {
  const memoizedVietnameseContent: ReactElement = useMemo(() => {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <Image
          src="/images/langgao-logo.svg"
          alt="Logo"
          className="mx-auto mb-6"
          width={200}
          height={200}
        />

        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Chính Sách Bảo Mật
        </h1>
        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          1. Giới Thiệu
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và
          bảo vệ thông tin cá nhân khi bạn sử dụng ứng dụng của chúng tôi. Chúng
          tôi cam kết tuân thủ quy định của Google Play, Apple App Store và Nghị
          định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân, cũng như các quy định
          bảo mật thông tin tại Hàn Quốc.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          2. Thông Tin Thu Thập
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Chúng tôi có thể thu thập các loại thông tin sau:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4 pl-5">
          <li>Thông tin cá nhân: Tên, email, số điện thoại.</li>
          <li>Thông tin thiết bị: Loại thiết bị, hệ điều hành, địa chỉ IP.</li>
          <li>Dữ liệu sử dụng: Thời gian sử dụng, tính năng được sử dụng.</li>
        </ul>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          3. Mục Đích Sử Dụng Thông Tin
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Chúng tôi sử dụng thông tin cá nhân để:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4 pl-5">
          <li>Cung cấp và cải thiện dịch vụ.</li>
          <li>Liên lạc hỗ trợ khách hàng.</li>
          <li>Phát hiện và ngăn ngừa gian lận, bảo vệ an toàn.</li>
        </ul>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          4. Chia Sẻ Thông Tin
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba trừ
          khi có sự đồng ý của bạn, hoặc khi pháp luật yêu cầu.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          5. Quyền Của Bạn
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">Bạn có quyền:</p>
        <ul className="list-disc list-inside text-gray-600 mb-4 pl-5">
          <li>Truy cập, cập nhật và xóa thông tin cá nhân.</li>
          <li>Rút lại sự đồng ý về việc thu thập và sử dụng thông tin.</li>
          <li>
            Yêu cầu giới hạn việc xử lý thông tin cá nhân theo quy định tại Hàn
            Quốc.
          </li>
        </ul>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          6. Bảo Mật Thông Tin
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật để bảo vệ thông tin
          cá nhân khỏi truy cập trái phép, mất mát hoặc tiết lộ. Chúng tôi cũng
          tuân thủ các quy định bảo mật của Hàn Quốc, bao gồm các biện pháp về
          bảo vệ dữ liệu cá nhân và quyền của người dùng.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          7. Chi Tiết Về Quy Định Bảo Mật Của Apple
        </h3>
        <ul className="list-disc list-inside text-gray-600 mb-4 pl-5">
          <li>
            <strong>Minh bạch trong thu thập dữ liệu:</strong> Chúng tôi cam kết
            cung cấp thông tin rõ ràng về việc thu thập dữ liệu qua các trang
            khai báo bắt buộc khi người dùng lần đầu sử dụng ứng dụng.
          </li>
          <li>
            <strong>Quyền truy cập của người dùng:</strong> Chúng tôi cung cấp
            tính năng cho phép người dùng truy cập và quản lý thông tin cá nhân
            của họ trong cài đặt ứng dụng.
          </li>
          <li>
            <strong>Bảo vệ dữ liệu:</strong> Chúng tôi sử dụng các biện pháp mã
            hóa, bảo vệ dữ liệu khi truyền tải và lưu trữ, đảm bảo rằng thông
            tin cá nhân được an toàn tránh khỏi truy cập trái phép.
          </li>
          <li>
            <strong>Quy định về bên thứ ba:</strong> Chúng tôi cam kết không
            chia sẻ thông tin cá nhân cho bên thứ ba trừ khi có sự đồng ý của
            người dùng, hoặc khi pháp luật yêu cầu.
          </li>
          <li>
            <strong>Chính sách quản lý dữ liệu:</strong> Chúng tôi có cơ chế
            quản lý dữ liệu nghiêm ngặt để đảm bảo tuân thủ các tiêu chuẩn của
            Apple và bảo vệ quyền riêng tư của người dùng.
          </li>
        </ul>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          8. Lưu Trữ Dữ Liệu
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Chúng tôi sẽ lưu trữ thông tin cá nhân trong thời gian cần thiết để
          đáp ứng mục đích thu thập thông tin, trừ khi pháp luật yêu cầu thời
          gian lâu hơn. Sau khi không còn cần thiết, chúng tôi sẽ xóa hoặc ẩn
          danh thông tin cá nhân.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          9. Thay Đổi Chính Sách Bảo Mật
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Bất
          kỳ thay đổi nào sẽ được thông báo trên trang web hoặc qua ứng dụng
          trước khi có hiệu lực.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          10. Liên Hệ
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên
          hệ chúng tôi qua email hoặc số điện thoại cung cấp trong cài đặt ứng
          dụng.
        </p>
      </div>
    );
  }, []);

  const memoizedKoreanContent: ReactElement = useMemo(() => {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <Image
          src="/images/langgao-logo.svg"
          alt="Logo"
          className="mx-auto mb-6"
          width={200}
          height={200}
        />
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          개인정보 보호정책
        </h1>
        <h3 className="text-3xl font-semibold mb-4 text-gray-800">1. 소개</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          이 개인정보 보호정책은 저희가 어떤 데이터를 수집하고, 왜 수집하며,
          어떻게 사용하는지 설명합니다. 저희는 Google Play, Apple App Store 및
          한국의 개인정보 보호 규정을 준수할 것을 약속합니다.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          2. 수집하는 정보
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          저희는 다음과 같은 정보를 수집할 수 있습니다:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4 pl-5">
          <li>개인 정보: 이름, 이메일, 전화번호.</li>
          <li>장치 정보: 장치 유형, 운영 체제, IP 주소.</li>
          <li>사용 데이터: 사용 시간, 사용된 기능.</li>
        </ul>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          3. 정보 사용 목적
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          저희는 개인 정보를 다음과 같은 목적으로 사용합니다:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4 pl-5">
          <li>서비스 제공 및 개선.</li>
          <li>고객 지원 연락.</li>
          <li>사기 방지 및 안전 보호.</li>
        </ul>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          4. 정보 공유
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          저희는 귀하의 동의 없이 제3자와 개인 정보를 공유하지 않으며, 법적으로
          요구되는 경우에만 공유합니다.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          5. 귀하의 권리
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          귀하는 다음과 같은 권리를 가집니다:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4 pl-5">
          <li>개인 정보 접근, 업데이트 및 삭제.</li>
          <li>정보 수집 및 사용에 대한 동의 철회.</li>
          <li>한국 규정에 따른 정보 처리 제한 요청.</li>
        </ul>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          6. 정보 보안
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          저희는 개인 정보를 무단 접근, 손실 또는 유출로부터 보호하기 위해
          기술적 보안 조치를 적용합니다. 또한, 한국의 개인정보 보호 규정을
          준수합니다.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          7. Apple의 개인정보 보호 규정
        </h3>
        <ul className="list-disc list-inside text-gray-600 mb-4 pl-5">
          <li>
            <strong>데이터 수집의 투명성:</strong> 사용자가 처음으로
            애플리케이션을 사용할 때 필수 공개 페이지를 통해 데이터 수집에 대한
            명확한 정보를 제공하는 데 전념하고 있습니다.
          </li>
          <li>
            <strong>사용자 접근 권한:</strong> 저희는 사용자가 앱 설정에서 개인
            정보를 접근하고 관리할 수 있는 기능을 제공합니다.
          </li>
          <li>
            <strong>데이터 보호:</strong> 저희는 전송 및 저장 시 데이터를
            암호화하여 개인 정보가 무단 접근으로부터 안전하게 보호되도록 합니다.
          </li>
          <li>
            <strong>제3자 규정:</strong> 저희는 사용자의 동의 없이 제3자에게
            개인 정보를 공유하지 않으며, 법적으로 요구되는 경우에만 공유합니다.
          </li>
          <li>
            <strong>데이터 관리 정책:</strong> 저희는 Apple의 기준을 준수하고
            사용자 개인정보를 보호하기 위해 엄격한 데이터 관리 메커니즘을 갖추고
            있습니다.
          </li>
        </ul>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          8. 데이터 저장
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          저희는 정보 수집 목적을 달성하기 위해 필요한 기간 동안 개인 정보를
          저장하며, 법적으로 더 긴 기간이 요구되지 않는 한, 필요하지 않게 되면
          개인 정보를 삭제하거나 익명화합니다.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          9. 개인정보 보호정책 변경
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          저희는 이 개인정보 보호정책을 수시로 업데이트할 수 있습니다. 변경
          사항은 웹사이트 또는 앱을 통해 사전에 공지됩니다.
        </p>

        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          10. 연락처
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          이 개인정보 보호정책에 대한 질문이 있으시면, 앱 설정에 제공된 이메일
          또는 전화번호를 통해 저희에게 연락해 주십시오.
        </p>
      </div>
    );
  }, []);

  const memoizedPolicyContent: ReactElement = useMemo(() => {
    const locale = window.location.href.includes('/ko/') ? 'ko' : 'vi';
    if (locale === 'ko') {
      return memoizedKoreanContent;
    }
    return memoizedVietnameseContent;
  }, [memoizedKoreanContent, memoizedVietnameseContent]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {memoizedPolicyContent}
    </div>
  );
};

export default PolicyPage;
