import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const useBreadcrumbs = () => {
  const [breadcrumbPaths, setBreadcrumbPaths] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const pathArray = pathname.split("/").filter((path) => path);
    setBreadcrumbPaths(pathArray);
  }, [pathname]);

  return breadcrumbPaths;
};

export default useBreadcrumbs;
