import * as F7Icons from "framework7-icons/react";

import { toPascalCase } from '@/helpers/to_pascal_case';

export function resolveIcon(name: string) {
    
  return F7Icons[toPascalCase(name) as keyof typeof F7Icons] ?? null;
}