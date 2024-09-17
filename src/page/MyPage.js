import React, { useEffect, useState } from "react";
import '../styles/RecentPage.css'

const MyPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState(null);  // 프로필
    const [bookmarkedPages, setBookmarkPages] = useState([]); //북마크
    const [recentPages, setRecentPages] = useState([]); //최근 본 페이지
    const [currentView, setCurrentView] = useState(["profile"]); //현재 표시 화면

    const [error, setError] = useState(null);

    //최근 본 페이지 불러오기
    const fetchRecentPages = async () => {
        try {
            const response = await fetch("/api/recentpages");
            if (response.status === 401) {
                setIsLogin(false);
                return;
            }
            const data = await response .json();
            setIsLogin(true);
            setRecentPages(data);
        } catch(error) {
            console.error("Error fetching recent pages:", error);
            setError("페이지를 불러오는 중 오류가 발생했습니다.")
        } finally {
            setLoading(false);
        }
    };

    // 북마크 불러오기
    const fetchBookmarkPages = async () => {
        try {
            const response = await fetch("/api/bookmarkpages");
            if (response.status === 401) {
                setIsLogin(false);
                return;
            }
            const data = await response .json();
            setBookmarkPages(data);
        } catch(error) {
            console.error("Error fetching bookmark pages:", error);
            setError("페이지를 불러오는 중 오류가 발생했습니다.")
        } finally {
            setLoading(false);
        }
    };

    // 프로필
    const fetchProfilePage = async () => {
        try {
            const response = await fetch("/api/profile");
            if (response.status === 401) {
                setIsLogin(false);
                return;
            }
            const data = await response .json();
            setProfile(data);
        } catch(error) {
            console.error("Error fetching profile pages:", error);
            setError("페이지를 불러오는 중 오류가 발생했습니다.")
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (currentView === "recent") {
            fetchRecentPages();
        } else if (currentView === "bookmark") {
            fetchBookmarkPages();
        } else if (currentView === "profile") {
            fetchProfilePage();
        }
    }, [currentView, isLogin]);

    const handleViewChange = (view) => {
        setCurrentView(view);
    }

    return (
        <div className="user-page">
            {/* Left Sidebar Section */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="user-profile">
                        <img src="https://via.placeholder.com/50" alt="User" className="user-image" />
                        <p onClick={() => handleViewChange("profile")} className="username">{isLogin ? "UserName" : "로그인이 필요합니다."}</p>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li onClick={() => handleViewChange("recent")}><i className="icon-clock"></i>최근 본 페이지</li>
                        <li onClick={() => handleViewChange("bookmark")}><i className="icon-bookmark"></i>북마크</li>
                        <li onClick={() => handleViewChange("callender")}><i className="icon-calendar"></i>캘린더</li>
                        <li><i className="icon-chat"></i>1:1 AI CHAT</li>
                        <hr></hr>
                        <li><i className="icon-faq"></i>FAQ</li>
                        <li onClick={() => handleViewChange("setting")}><i className="icon-settings"></i>설정</li>
                        <hr></hr>
                        <li><i className="icon-logout"></i>로그아웃</li>
                    </ul>
                </nav>
            </div>

            <div className="content-page">
                {isLogin ? (
                    loading ? (
                        <p>로딩중...</p>
                    ) : (
                        // 프로필
                        currentView === "profile" ? (
                            profile ?(
                            <div className="profile-section">
                                <img src = {profile.imageUrl || "https://via.placeholder.com/100"} alt = "user" className="user-image-large" />
                                <p className="username">{profile.username}</p>
                                <button className="change-username">닉네임 변경</button>
                                <p className="join-date">가입일 : {profile.registrationDate}</p>
                                <p className="user-bio">한줄소개 : {profile.introduction}</p>
                                <button className="change-password">비밀번호 변경</button>  
                            </div>
                            ) : <p className="recent-non">프로필을 불러오는 중 오류가 발생했습니다.</p>
                        ) :
                        // 최근 본 페이지
                        currentView === "recent" ? (
                            recentPages.length === 0 ? (
                                <p className="recent-non">최근 본 페이지가 없습니다.</p>
                            ) : (
                                <div className="recent-page-list">
                                <h2>최근 본 페이지</h2>
                                <div className="pages-grid">
                                    {recentPages.map((page, index) => (
                                        <div key={index} className="page-item">
                                            <img src={page.imgeUrl} alt={page.title} className="page-image" />
                                            <h3>{page.title}</h3>
                                        </div>
                                    ))}
                                </div>
                                <div className="pagination">
                                    <button className="prev">{"<"}</button>
                                    <button className="next">{">"}</button>
                                </div>
                            </div>
                            )
                        ) :
                        // 북마크
                        currentView === "bookmark" ? (
                            bookmarkedPages.length === 0 ? (
                                <p className="recent-non">북마크가 없습니다.</p>
                            ) : (
                                <div className="bookmark-page-list">
                                    <h2>북마크</h2>
                                    <div className="pages-grid">
                                        {bookmarkedPages.map((page, index) => (
                                            <div key={index} className="page-item">
                                                <img src={page.imgeUrl} alt={page.title} className="page-image" />
                                                <h3>{page.title}</h3>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pagination">
                                        <button className="prev">{"<"}</button>
                                        <button className="next">{">"}</button>
                                    </div>
                                </div>
                            )
                        ) : null
                    )
                ) : (
                    <p>로그인이 필요합니다.</p>
                )}
                
            </div>
        </div>
        
    );
     
};

export default MyPage;