

import type { FC, ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  link?: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description, icon, link }) => (
  <div className="service-card">
    <div className="service-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    {link && <a className="card-link" href={link}>Learn More</a>}
  </div>
);

export default ServiceCard;
