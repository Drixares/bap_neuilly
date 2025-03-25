import Image from "next/image";

export const Logo = () => (
    <div className="h-[99px] w-auto">
      <Image 
        src="/img/image 7.png" 
        alt="logo" 
        width={150} 
        height={99}
        className="h-full w-auto" 
        priority
      />
    </div>
  );