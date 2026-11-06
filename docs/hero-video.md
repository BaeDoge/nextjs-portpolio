# 메인 화면 AI 루프 영상 넣기

`public/hero/loop.mp4` 파일을 넣으면 메인 첫 화면의 인물 카드에서 사진 대신 영상이 반복 재생됩니다.
파일이 없으면 지금처럼 사진 + 파티클 연출이 나옵니다. 코드를 바꿀 필요는 없습니다.

## 1. 영상 만들기

사진(`public/images/avatar_wide.jpg`)을 이미지-투-비디오 AI 도구(Runway, Kling, Luma, Pika, Veo 등)에 넣고
4~6초짜리 영상을 만듭니다. 얼굴이 크게 바뀌지 않는 잔잔한 움직임이 가장 자연스럽습니다.

프롬프트 예시:

```text
Subtle cinematic motion. The man looks down at his phone, then slightly lifts his eyes.
Soft breathing, gentle hair movement, light shifting through the window.
Camera barely moves, slow push-in. Keep the face and clothes unchanged. Realistic, no text.
```

- 세로 비율(약 3:4 또는 9:16)로 만들면 카드에 가장 잘 맞습니다.
- 얼굴이 변형되거나 옷 무늬가 흔들리면 다시 생성하세요. 본인처럼 보이지 않으면 오히려 역효과입니다.

## 2. 자연스럽게 반복되도록 + 용량 줄이기

끝과 처음이 맞지 않으면 반복할 때 튑니다. 앞으로 갔다가 거꾸로 돌아오는 방식이 가장 간단합니다.

```bash
ffmpeg -i source.mp4 -filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[v]" \
  -map "[v]" -an -vf "scale=720:-2,fps=24" \
  -c:v libx264 -crf 28 -preset slow -movflags +faststart public/hero/loop.mp4
```

목표 용량은 2MB 이하입니다. 더 크면 `-crf 30`으로 올리거나 `scale=640:-2`로 줄이세요.

## 3. 확인

- 영상이 나오는 동안에도 사진은 `poster`와 파티클 연출에 그대로 쓰입니다.
- 모션 줄이기 설정을 켠 사용자에게는 파티클/틸트 연출이 꺼집니다. 영상은 음소거 자동재생이라 계속 재생됩니다.
