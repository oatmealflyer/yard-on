import React from "react";
import {
  BrowserRouter, // BroswserRouter : 주소에 따라 화면을 이동할 수 있도록 감싸기 
  Routes, 
  Route,
  Navigate, // 다른 주소로 자동 이동 
  Link 
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import OrderListPage from "./pages/OrderListPage";
import OrderDetailRoute from "./pages/OrderDetailPage";
import NewOrderPage from "./pages/NewOrderPage"; 

import "./App.css";

class App extends React.Component{
  
  // App에 로그인 사용자 저장 
  // 목록과 상세 페이지에서도 같은 사용자 정보가 필요하므로, 공통 부모인 App에서 관리하는 것 
  constructor(props){
    super(props);

    this.state = {
      currentUser : null, // currentUser : 로그인한 사용자 , 처음에는 로그인 한 사람 없으므로 null 
    };
  }

  // 목록 조회에 필요한 사업자등록번호와 화면에 표시할 업체명 저장 
  // 비밀번호 제외 
  handleLogin = (user) =>{
    this.setState({
      currentUser : {
        companyId : user.companyId,
        companyName : user.companyName,
      },
    });
  };

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          {/* 화면 이동 확인용 임시 메뉴 */}
          <nav>
            <Link to ="/login">로그인</Link>
             {/* Link : 클릭하면 to 에 지정한 주소로 이동 */}
          {" | "}
            <Link to ="/orders">접수 내역</Link>
          {" | "}
            <Link to ="/orders/new">신규접수</Link>
          {" | "}
            <Link to ="/orders/ORD-001">상세확인</Link>
          </nav>

          {/* App 화면의 저장 결과 표시 */}
          {this.state.currentUser && (
            <p>
              로그인 업체 : {this.state.currentUser.companyName}
            </p>
          )}

          {/* 현재 주소에 해당하는 페이지 표시 */}
          <Routes>  
            {/* Routes : 현재 주소와 일치하는 경로 선택  */}
            <Route
              path = "/"
              element ={<Navigate to ="/login" replace />}
            />   
            {/* Route : path 주소에서 element의 컴포넌트를 보여줌  */}
            <Route
              path = "/login"
              element ={
              <LoginPage
                currentUser={this.state.currentUser}
                onLogin={this.handleLogin}/>}
              // App에서 handleLogin 함수 전달 
              // LoginPage 는 전달 받은 함수를 this.props.onLogin으로 사용할 수 있음 
              // handleLogin뒤에 ()붙이면 지금 실행하는 것이 되므로 작성치 않음 
              // onLogin : 로그인 성공시 사용자를 저장하는 함수 
            />
            <Route
              path = "/orders"
              element = {
              <OrderListPage currentUser={this.state.currentUser}/>
              // 목록을 거래처별로 구분하기 위해 로그인 사용자 정보 전달 
              }
            />
            <Route
              path = "/orders/new"
              element = {<NewOrderPage/>}
            />
            <Route
              path = "orders/:orderId"
              element = {
                <OrderDetailRoute currentUser={this.state.currentUser}/>
              }
            />
            <Route
              path = "*"
              // path = "*" : 정의하지 않은 주소에 안내 화면 보여줌 
              element = {<h1>페이지를 찾을 수 없습니다.</h1>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;