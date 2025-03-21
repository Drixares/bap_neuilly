import * as React from "react";

interface EmailTemplateProps {
    Name: string;
    Token: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    Name,
    Token,
}) => (
    <div>
        <h1>Bienvenue, {Name} à MadeInNeuilly !</h1>
        <p>
            Pour compléter votre inscription, veuillez cliquer sur le lien
            suivant : <a href={`http://localhost:3000/verify?token=${Token}`}>Lien</a>
        </p>
    </div>
);
