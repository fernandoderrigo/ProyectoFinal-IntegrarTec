'use client'

import Microphone from "@/components/common/navigation-bar/Microphone";

const MyPage = () => {
  const navigate = (route) => {
  };

  const changeColor = (color) => {
    document.body.style.backgroundColor = color;
  };

  const changeBackground = (style) => {
    document.body.style.backgroundImage = style.backgroundImage;
    document.body.style.backgroundColor = style.backgroundColor;
  };

  return (
    <div>
      <Microphone
        onNavigate={navigate}
        onColorChange={changeColor}
        onBackgroundChange={changeBackground}
      />
    </div>
  );
};

export default MyPage;
