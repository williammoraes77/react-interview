import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HomeCard } from "../../components/HomeCard";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import {
  Wrapper,
  PageTitleContainer,
  PageInfos,
  InfoTitle,
  InfoResume,
  BodyContent,
} from "./styles";
import { api } from "../../server/api";

export function Home() {
  const [animesAmount, setAnimesAmount] = useState(0);
  const [mangasAmount, setMangasAmount] = useState(0);

  async function loadAnimesAmount() {
    try {
      const response = await api.get("/anime");

      setAnimesAmount(response.data.meta.count);
    } catch (error) {}
  }
  async function loadMangasAmount() {
    try {
      const response = await api.get("/manga");

      setMangasAmount(response.data.meta.count);
    } catch (error) {}
  }

  useEffect(() => {
    loadAnimesAmount();
    loadMangasAmount();
  }, []);

  return (
    <div>
      <Wrapper>
        <Sidebar />
        <main>
          <PageTitleContainer>
            <PageInfos>
              <InfoTitle>Bom dia, William</InfoTitle>
              <InfoResume>Escolha o que deseja ver!</InfoResume>
            </PageInfos>
          </PageTitleContainer>
          <BodyContent>
            <NavLink to="/animes" title="Animes">
              <HomeCard type="anime" name="Animes" amount={animesAmount} />
            </NavLink>
            <NavLink to="/mangas" title="Mangás">
              <HomeCard type="manga" name="Mangás" amount={mangasAmount} />
            </NavLink>
          </BodyContent>
        </main>
      </Wrapper>
    </div>
  );
}
