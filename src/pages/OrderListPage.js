import React from "react";
import { Navigate,Link } from "react-router-dom";
// Navigate 는 로그인 정보가 없을때 로그인 화면으로 이동 시키는데 사용 
import { mockOrders} from "../data/mockOrders"; 

class OrderListPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectedTab : "전체",
            // 첫 화면에서는 전체 접수를 보여주므로 초기값 전체로 설정 
        };
    }

    // 탭 변경 함수 
    handleTabChange = (tab) => {
        this.setState({
            selectedTab : tab,
        });
    };

    render(){
        const currentUser = this.props.currentUser;

        // 로그인 정보가 없으면 목록을 조회하지 않음 
        if(!currentUser){
            return<Navigate to="/login" replace/>;
        }

        // 로그인한 거래처의 접수만 선택 
        const companyOrders = mockOrders.filter((order) => { // filter(...) : 조건에 맞는 접수만 선택 
            return order.companyId === currentUser.companyId;
        }); 

        // 탭 필터 
        // "전체" : 거래처 모든 접수 유지 
        // "반입" : operationType이 "반입"인 접수만 유지 
        // "반출" : operationType이 "반출"인 접수만 유지 
        // 거래처 필터로 만든 목록에 탭 필터 적용 
        const visibleOrders = companyOrders.filter((order) => {
            if(this.state.selectedTab === "전체"){
                return true;
            }

            return order.operationType === this.state.selectedTab; 
        }) 

        return(
            <main>
                <h1>접수 내역</h1>
                <p>{currentUser.companyName}</p>
                <button
                    type="button"
                    onClick={() => this.handleTabChange("전체")}
                    // onClick = {this.handleTabChange("전체")} 로 작성시 클릭을 기다리지 않고 화면을 그리는 중에 호출 하므로 주의  
                    aria-pressed={this.state.selectedTab === "전체"}
                    // aria-pressed : 버튼의 선택 상태를 보조 기술에 전달 , 눈에 보이는 선택 스타일은 이후 CSS 추가 하기 
                >
                 전체 
                </button>
                
                <button
                    type="button"
                    onClick ={() => this.handleTabChange("반입")}
                    aria-pressed={this.state.selectedTab === "반입"}
                >
                 반입 
                </button>

                <button
                    type="button"
                    onClick ={() => this.handleTabChange("반출")}
                    aria-pressed={this.state.selectedTab === "반출"}
                >
                 반출 
                </button>
                {/* 버튼 동작 확인용 */}
                {/* <p>선택한 탭 : {this.state.selectedTab}</p> */}

                <p>접수 건수 : {visibleOrders.length}건</p>
                {/* companyOrders 는 props와 MockData 로 계산할 수 있으므로 별도 stat 에 저장하지 않음  */}

                {visibleOrders.length === 0 ? (
                    <p>해당 조건의 접수 내역이 없습니다 </p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">컨테이너번호</th>
                                <th scope="col">입고일자</th>
                                <th scope="col">터미널 반입 가능일</th>
                                <th scope="col">작업 구분</th>
                                <th scope="col">작업 상태</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleOrders.map((order) => ( // map(...) : 선택한 접수 각각을 표의 행으로 만듦 
                                <tr key={order.orderId}>
                                    {/*  key = {order.orderId} : React가 각 행을 구분 할 수 있는 고유 식별값  */}
                                    <td>
                                        <Link to={`/orders/${order.orderId}`}>
                                              {/* order.orderId가 "ORD-001"이면 이동 주소는 "/orders/ORD-001"  */}
                                              {order.containerNo}
                                        </Link>
                                    </td>
                                    <td>{order.inDate || "-"}</td>
                                    {/* || "- " : 값이 null 또는 빈 문자열일때 그 자리에 - 표시 */}
                                    <td>{order.terminalAvailableDate || "-"}</td>
                                    <td>{order.operationType}</td>
                                    <td>{order.yardStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        );
    }
}

export default OrderListPage;
