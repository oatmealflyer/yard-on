import React from "react";
import { mockUsers } from "../data/mockUsers";
import { Navigate } from "react-router-dom";

class LoginPage extends React.Component {
    
    constructor(props){ // constructor(props) : 컴포넌트 인스턴스가 생성될때 초기 설정 
                        // props : 부모 컴포넌트에서 전달 받은 값 
        super(props);
                        // super(props) : 부모 클래스인 React.Component 의 생성자를 호출 
        this.state = {
            companyId : "",
            password : "",
            errorMessage : "",
        };
    }

    // 사업자등록번호 입력값 변경 
    handleCompanyIdChange = (event) => {
        this.setState({
            companyId : event.target.value,
        });
    };

    // 비밀번호 입력값 변경 
    handlePasswordChange = (event) => {
        this.setState({
            password : event.target.value,
        });
    };

    // 아이디 비밀번호 제출 
    handleSubmit = (event) => {
        event.preventDefault(); // event.preventDefault() : 브라우저의 기본 폼 제출로인한 페이지 새로고침 막기 
    
        const {companyId,password} = this.state;
        // 검사할 입력값을 state 에서 가져오기 
        
        if(!/^\d{10}$/.test(companyId)) {
            this.setState({
                errorMessage : "사업자등록번호를 10자리로 입력해주세요",
            });
            return;
        }

        if(!/^\d{4}$/.test(password)){
            this.setState({
                errorMessage : "비밀번호를 숫자 4자리로 입력해주세요",
            });
            return; // return : 조건 통과하지 못했을때 제출 처리 끝내기 
        }

        // 사업자 등록번호와 비밀번호가 모두 일치하는 계정 찾기 
        const matchedUser = mockUsers.find((user) => {
            // find() : 조건에 맞츤 첫번째 객체를 반환 , 또는 undefined 반환 
            // user : 배열에서 차례로 확인하는 계정 객체  
            return (
                user.companyId === companyId && // && : 두 비교가 모두 참이어야 함 
                user.password === password
            );
        });

        //일치하는 계정이 없으면 제출 처리 끝냄 
        if(!matchedUser){
            this.setState({
                errorMessage : "사업자 등록번호 또는 비밀번호가 일치하지 않습니다",
            });
            return;
        }

        // 일치하는 계정이 있으면 오류를 지우고
        this.setState({
            errorMessage : "",
        });
        
        // 확인 한 사용자 정보를 App에 전달 
        this.props.onLogin(matchedUser);
        //LoginPage가 부모의 state를 직접 변경하는 대신 , 부모가 전달한 함수를 호출해 저장을 요청 
    }

    render(){
        //render() 이 컴포넌트가 화면에 무엇을 보여줄지 반환하는 메서드 
        
        // 로그인 사용자가 있으면 접수 목록으로 이동 
        if(this.props.currentUser){
            return<Navigate to = "/orders" replace /> 
            // replace : 현재 로그인 주소를 목록 주소로 대체 
        }
        
        // 로그인한 사용자가 없으면 기존 로그인 화면을 표시 
        return(
            <main>
                <h1>로그인</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* onClick 대신 폼의 onSubmit 사용시 버튼 클릭과 입력창에서 Enter 를 누르는 동작 함께 처리 가능 */}
                    <div>
                        <label htmlFor="companyId">사업자등록번호</label>
                        <input
                        id="companyId"
                        type="text"
                        value={this.state.companyId} // 입력창에 보여줄 값 
                        onChange={this.handleCompanyIdChange}
                        placeholder="사업자등록번호 10자리를 입력해주세요"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">비밀번호</label>
                        <input 
                        id="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        placeholder="비밀번호 4자리를 입력해주세요"
                        />
                    </div>
                    {this.state.errorMessage && (
                        <p role="alert">{this.state.errorMessage}</p>
                    )}
                    {/* errorMessage 가 빈 문자열 일때 → 거짓 , 내용이 있는 문자열 → 참 */}
                    {/* && (논리 AND 연산자) : 왼쪽값이 거짓이면 왼쪽값 반환 왼쪽값이 참이면 오른쪽 값 반환 */}
                    <button type="submit">로그인</button>
                </form>
            </main>
        )
    }
}

export default LoginPage;
// export default : 다른 파일에서 이 컴포넌트를 가져올 수 있게함 