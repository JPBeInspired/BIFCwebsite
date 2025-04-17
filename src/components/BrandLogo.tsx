interface BrandLogoProps {
  name: string;
  logo: string;
}

export default function BrandLogo({ name, logo }: BrandLogoProps) {
  return (
    <div className="flex-shrink-0 mx-8 w-[180px] h-[80px] flex items-center justify-center">
      <img
        src={logo}
        alt={`${name} logo`}
        className="max-w-full max-h-full object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
      />
    </div>
  );
}