"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname
    .split("/")
    .filter((path) => path && !path.match(/^[0-9a-fA-F]{24}$/));

  const breadcrumbPaths = useMemo(() => {
    return pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return { path, href };
    });
  }, [pathArray]);

  const getBreadcrumbName = (path) => {
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2">
        <li className="breadcrumb-item">
          <Link
            href="/dashboard"
            className="f-subheading text-blue-700 hover:underline"
          >
            Dashboard
          </Link>
          <span className="f-subheading mx-2 text-gray-500">/</span>
        </li>
        {breadcrumbPaths.map(({ path, href }, index) => (
          <li key={index} className="breadcrumb-item">
            <Link
              href={href}
              className="f-subheading text-blue-700 hover:underline"
            >
              {getBreadcrumbName(path)}
            </Link>
            {index < breadcrumbPaths.length - 1 && (
              <span className="f-subheading mx-2 text-gray-500">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
