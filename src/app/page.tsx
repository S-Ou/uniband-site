"use client";

import { Button, Title } from "@/components/atomic";
import { HighlightImage } from "@/components/components";
import LinkIcons from "@/components/LinkIcons";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UniBandConfig } from "@/config";
import { useEffect, useState } from "react";
import { ConfigText } from "@/components/ConfigText";

const TitleBlock = styled.div`
  padding-block: 10rem;
  text-align: center;
  font-stretch: expanded;

  p {
    font-size: clamp(2vw, 6vw, 2rem);
  }
`;

const TitleText = styled(Title)`
  font-size: clamp(10vw, 20vw, 9rem);
`;

const JoinButton = styled.button`
  background: var(--blue-gradient);
  border-radius: 0.5rem;
  border: none;
  color: var(--background);
  cursor: pointer;
  font-size: 1.5rem;
  font-stretch: expanded;
  font-weight: 600;
  margin-top: 2rem;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  transition: transform 400ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const About = styled.div`
  background: var(--dark-blue);
  color: var(--background);
  display: grid;
  gap: 2rem;
  grid-template-columns: 60% auto;
  padding-block: 2rem;
  padding-inline: var(--body-margins);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  gap: 1.5rem;
  justify-content: center;

  h2 {
    font-size: 2rem;
    font-weight: 400;
  }
`;

const Gallery = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const SliderStyle = styled(Slider)`
  .slick-slide {
    opacity: 0.8;
    transition: all 1000ms ease;
    transform: scale(0.95);
  }

  .slick-center {
    color: #e67e22;
    opacity: 1;
    transform: scale(1);
  }
`;

const GalleryImageWrapper = styled.div`
  align-items: center;
  display: flex;
  height: clamp(0px, 30rem, min(80vh, 50rem));
  justify-content: center;
  overflow: hidden;
  width: 100%;
  max-width: 80vw;
`;

const GalleryImage = styled.img`
  border-radius: 1rem;
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
`;

function GalleryComponent() {
  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 1000,
    variableWidth: true,
    pauseOnHover: true,
  };

  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data: string[] = await response.json();
        data.sort(() => Math.random() - 0.5);
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <Gallery>
      <SliderStyle {...settings}>
        {files.map((filePath, i) => (
          <div key={filePath}>
            <GalleryImageWrapper>
              <GalleryImage
                key={filePath}
                src={`/${UniBandConfig.galleryPath}/${filePath}`}
                alt={`Gallery image ${i + 1}`}
              />
            </GalleryImageWrapper>
          </div>
        ))}
      </SliderStyle>
    </Gallery>
  );
}

export default function Home() {
  const configText = UniBandConfig.home;
  const infoImage = UniBandConfig.home.infoImage;

  return (
    <>
      <TitleBlock>
        <TitleText>UniBand</TitleText>
        <ConfigText text={configText.subtitle} />
        <JoinButton>
          <a href="/join">Join the band</a>
        </JoinButton>
      </TitleBlock>
      <About>
        <HighlightImage src={infoImage.path} alt={infoImage.alt} />
        <AboutText>
          <ConfigText text={configText.infoHeader} wrapper="h2" />
          <ConfigText text={configText.infoContent} />
          <Button background="var(--dark-blue)" color="var(--background)">
            <a href="/about">Learn more</a>
          </Button>
          <LinkIcons />
        </AboutText>
      </About>
      <GalleryComponent />
    </>
  );
}
