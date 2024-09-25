const axios = require('axios');

app.get('/auth/kakao/callback', async (req, res) => {
// 카카오에서 전달된 code를 쿼리 파라미터에서 추출
  const { code } = req.query;

  try {
    // 카카오 API에 토큰 요청
    const tokenResponse = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          client_id: '977fb60304f38cb2010c792fb5b934f2', // 자바스크립트 api 키
          redirect_uri: 'https://poketopa.github.io/blockChain_project/html/dashboard.html',  // 리다이렉트 URI
          code,  // 리다이렉션 페이지에서 받은 인가 코드
        },
      }
    );

    // 액세스 토큰을 콘솔에 출력
    console.log('액세스 토큰 :', access_token);
    
    // 액세스 토큰을 받아옵니다.
    const { access_token } = tokenResponse.data;

    // 액세스 토큰을 사용하여 사용자 정보 요청
    const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,  // 액세스 토큰을 헤더에 추가
      },
    });

    // 사용자 정보 확인
    console.log(userResponse.data);

    // 사용자 정보를 클라이언트에 전달하거나 세션에 저장
    res.send(userResponse.data);

  } catch (error) {
    console.error(error);
    res.status(500).send('카카오 로그인 중 에러 발생');
  }
});
