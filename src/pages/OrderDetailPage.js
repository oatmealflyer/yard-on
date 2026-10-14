import React from "react";
import { useParams,Navigate,Link } from "react-router-dom";
// useParams 는 함수형 컴포넌트에서 사용하는 Hook 
// 상세 페이지는 클래스로 유지하되, 주소를 읽어 전달하는 작은 함수형 컴포넌트 추가 
import { mockOrders } from "../data/mockOrders";

class OrderDetailPage extends React.Component{
    render(){
       const {orderId,currentUser} = this.props;

       // 로그인 정보 없으면 로그인 화면으로 이동 
       if(!currentUser){
        return <Navigate to="/login" replace />;
       }

       // 접수 번호와 거래처 ID가 모두 일치하는 접수 찾기 
       const order = mockOrders.find((item) => {
        return (
            item.orderId === orderId && 
            item.companyId === currentUser.companyId
        );
       });

       // 없는 접수이거나 다른 거래처 접수이면 표시하지 않음 
       if(!order){
        return(
            <main>
                <p>조회할 수 있는 접수 내역이 없습니다</p>
                <Link to="/orders">목록으로 돌아가기</Link>
            </main>
        )
       }

       return(
        <main>
            <h1>컨테이너 상세현황</h1>
                <dl>
                    <dt>업체명</dt>
                    <dd>{order.companyName}</dd>

                    <dt>접수번호</dt>
                    <dd>{order.orderId}</dd>

                    <dt>컨테이너번호</dt>
                    <dd>{order.containerNo}</dd>

                    <dt>작업 구분</dt>
                    <dd>{order.operationType}</dd>

                    <dt>작업 상태</dt>
                    <dd>{order.yardStatus}</dd>
                </dl>
            <Link to ="/orders">목록으로 돌아가기</Link>
        </main>
       )
    
    }
}

function OrderDetailRoute(props){
    const {orderId} = useParams();
    // orders/:orderId 경로에서 /orders/ORD-001로 접속하면 useParams()가 읽은 orderId는 "ORD-001" 
    return(
        <OrderDetailPage
            orderId = {orderId} // orderId : 주소에서 접수번호 
            currentUser = {props.currentUser} // currentUser : App에 저장한 로그인 사용자  
        />
    );
}

export default OrderDetailRoute;

//파일구조 
// import
// ↓
// class OrderDetailPage ...
// ↓
// function OrderDetailRoute ...
// ↓
// export default OrderDetailRoute;

