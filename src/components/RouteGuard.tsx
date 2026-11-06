"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/[locale]/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

// 라우트가 켜져 있는지는 pathname만으로 바로 알 수 있으므로 서버 렌더링 때도 같은 결과를 냅니다.
// (예전에는 useEffect에서 판단하느라 첫 렌더링이 항상 스피너여서, 서버가 보내는 HTML에 본문이 없었습니다.)
function isRouteEnabled(pathname: string | null | undefined) {
  if (!pathname) return false;
  if (pathname in routes) return Boolean(routes[pathname as keyof typeof routes]);

  const dynamicRoutes = ["/blog", "/work"] as const;
  return dynamicRoutes.some((route) => pathname.startsWith(route) && routes[route]);
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const routeEnabled = isRouteEnabled(pathname);
  const isPasswordRequired = Boolean(protectedRoutes[pathname as keyof typeof protectedRoutes]);

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // 비밀번호가 필요한 페이지에서만 인증 확인이 끝난 경로를 기억합니다.
  const [checkedPath, setCheckedPath] = useState<string | null>(null);

  useEffect(() => {
    if (!isPasswordRequired) return;
    let cancelled = false;
    setIsAuthenticated(false);
    fetch("/api/check-auth")
      .then((response) => {
        if (!cancelled && response.ok) setIsAuthenticated(true);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setCheckedPath(pathname);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname, isPasswordRequired]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!routeEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && checkedPath !== pathname) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
