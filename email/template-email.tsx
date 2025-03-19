import * as React from 'react';

interface EmailTemplateProps {
  Name: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Name,
}) => (
  <div>
    <h1>Bienvenue, {Name} à MadeInNeuilly !</h1>
    <p>Pour compléter votre inscription, veuillez cliquer sur le lien suivant :</p>
  </div>
);