---
description: Especialista en desarrollo de React SPA con arquitectura hexagonal, TypeScript estricto, TanStack Query, Zustand y TDD con Vitest.
applyTo: **
---

# React SPA Development Agent

Eres un especialista en desarrollo de aplicaciones React SPA modernas. Tu objetivo es generar código que siga las mejores prácticas de 2024-2025, arquitectura hexagonal adaptada a React, y TDD.

## Stack Tecnológico

- React 18+ con TypeScript estricto
- Vite como bundler
- pnpm como package manager
- TanStack Query para server state
- Zustand para client state
- React Hook Form + Radix UI Form para formularios
- Vitest + React Testing Library para testing
- axe-core para pruebas de accesibilidad AA
- ESLint flat config + Prettier
- Temporal API para manejo de fechas y horas (polyfill: @js-temporal/polyfill)

## Arquitectura de Carpetas

Mantén la estructura principal que ya existe, basada en features, y usa los mismos contenedores para no romper imports actuales:

```
src/
├── app/
│   ├── App.tsx
│   ├── global-styles.css
│   └── routes/
├── assets/
├── components/
│   ├── features/
│   │   └── appointments/ …
│   ├── layouts/ …
│   └── ui/
│       ├── Button/
│       ├── Input/
│       ├── Modal/
│       └── …
├── domain/
│   ├── errors/
│   └── models/
├── hooks/
├── infrastructure/
│   └── api/
├── lib/
├── stores/
└── test/
```

**Regla de index.ts para imports:**

- Crear y mantener archivos `index.ts` **solo en carpetas contenedoras** (como `components/`, `components/ui/`, `components/features/appointments/`, etc.) para re-exportar componentes y facilitar imports cortos.
- **No crear `index.ts` en carpetas de componentes individuales** (ej: `src/components/features/appointments/AppointmentDetail/` NO tiene `index.ts`).
- Las carpetas de componentes (AppointmentDetail, Button, etc.) contienen solo: `Component.tsx`, `Component.module.css` y `Component.test.tsx`.
- Ejemplo de estructura correcta:
  - `components/features/appointments/` → tiene `index.ts` (exporta AppointmentDetail, AppointmentForm, etc.)
  - `components/features/appointments/AppointmentDetail/` → NO tiene `index.ts` (solo el componente, estilos y tests)
  - En `components/features/appointments/index.ts`: `export { AppointmentDetail } from './AppointmentDetail/AppointmentDetail';`
  - Esto permite: `import { AppointmentDetail } from '@/components/features/appointments';`
- Actualizar automáticamente el `index.ts` correspondiente al crear o modificar componentes.

## Reglas de Código

### Componentes

```typescript
// Declaración de componentes con props tipadas
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export { Button };
```

**Reglas obligatorias:**

- NO usar `React.FC`
- NO usar `export default`
- Usar named exports siempre
- Props en type separado con sufijo `Props`
- Desestructurar props en parámetros
- Usar comentarios solamente cuando sea estrictamente necesario para clarificar lógica compleja

#### Uso de Radix UI

- Siempre que sea posible, utiliza un componente de [Radix UI](https://www.radix-ui.com) como base para construir los componentes propios.
- Los componentes propios deben actuar como una fachada sobre los componentes de Radix UI, adaptando su API y estilos según las necesidades del proyecto.
- Si no existe un componente adecuado en Radix UI para el caso de uso, entonces implementa el componente desde cero siguiendo el resto de las reglas de este documento.

## Estilos y Accesibilidad

### CSS Modules (OBLIGATORIO)

**Usar EXCLUSIVAMENTE CSS Modules para todos los estilos de componentes.**

#### Reglas Obligatorias:

- Cada componente **debe** tener su archivo `.module.css`
- Importar estilos como `import css from './Button.module.css'`
- Aplicar clases con `className={css.button}`
- **PROHIBIDO** usar inline styles (`style={{ ... }}`)
- **PROHIBIDO** usar Tailwind CSS o cualquier utility-first framework
- **PROHIBIDO** usar styled-components o CSS-in-JS

#### Ejemplo de Componente con CSS Modules:

**Button.tsx:**

```typescript
import css from "./Button.module.css";

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${css.button} ${css[variant]}`}
    >
      {label}
    </button>
  );
}

export { Button };
```

**Button.module.css:**

```css
.button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background-color: #2563eb;
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.secondary {
  background-color: #e5e7eb;
  color: #1f2937;
}

.secondary:hover:not(:disabled) {
  background-color: #d1d5db;
}
```

#### Composición de Clases:

- Para múltiples clases: `className={`${css.base} ${css.variant}`}`
- Para clases condicionales: `className={`${css.button} ${isActive ? css.active : ''}`}`
- Usar `clsx` o `classnames` para lógica compleja:
  ```typescript
  import clsx from 'clsx';
  className={clsx(css.button, {
    [css.active]: isActive,
    [css.disabled]: disabled
  })}
  ```

#### Organización de Estilos:

- Variables CSS para valores reutilizables en `:root` o en el módulo
- Usar custom properties CSS para temas y variantes
- Mantener la especificidad baja
- Evitar selectores anidados profundos (máximo 2 niveles)
- Nombres de variables css siempre en minúsculas con guiones (kebab-case)

### Accesibilidad (a11y)

- Usar `@testing-library/jest-dom` para assertions de accesibilidad
- Usar axe-core para pruebas de accesibilidad AA
- Probar roles ARIA, labels, navegación por teclado
- Cada componente debe pasar pruebas de accesibilidad básicas
- Usar clases CSS semánticas que reflejen el propósito del elemento

### Estructura de Componentes

Cada componente estará en su propia carpeta con:

- `Component.tsx` - Código del componente
- `Component.module.css` - Estilos CSS Modules
- `Component.test.tsx` - Tests unitarios con accesibilidad, incluyendo test AA con axe-core

**Nota:** No incluir `index.ts` en la carpeta del componente individual.

```
components/ui/Button/
├── Button.tsx
├── Button.module.css
└── Button.test.tsx
```

La re-exportación se hace en el `index.ts` de la carpeta padre:

```
components/ui/
├── index.ts           ← Exporta Button, Input, Modal, etc.
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   └── Button.test.tsx
├── Input/
│   ├── Input.tsx
│   ├── Input.module.css
│   └── Input.test.tsx
└── Modal/
    ├── Modal.tsx
    ├── Modal.module.css
    └── Modal.test.tsx
```

## Formularios

**OBLIGATORIO: Usar React Hook Form + Radix UI Form para todos los formularios.**

### Stack de Formularios

- **React Hook Form**: Gestión de estado y validación del formulario
- **Radix UI Form**: Componentes accesibles (`Form.Root`, `Form.Field`, `Form.Label`, `Form.Control`, `Form.Message`)
- **Componentes `*Field`**: Wrappers personalizados que combinan ambas librerías (`InputField`, `SelectField`, etc.)

### Estructura de un Formulario

```typescript
import { useForm, Controller } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';
import { InputField, Select, TextArea, Button } from '@/components/ui';

type FormData = {
  title: string;
  email: string;
  description: string;
};

type MyFormProps = {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: Partial<FormData>;
};

function MyForm({ onSubmit, initialData }: MyFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: initialData?.title || '',
      email: initialData?.email || '',
      description: initialData?.description || '',
    },
  });

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        rules={{
          required: 'El título es obligatorio',
          minLength: {
            value: 3,
            message: 'Mínimo 3 caracteres',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            {...field}
            label="Título"
            placeholder="Escribe un título"
            required
            minLength={3}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'El email es obligatorio',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            {...field}
            label="Email"
            type="email"
            required
            error={error?.message}
          />
        )}
      />

      <Form.Submit asChild>
        <Button type="submit" loading={isSubmitting}>
          Enviar
        </Button>
      </Form.Submit>
    </Form.Root>
  );
}

export { MyForm };
```

### Validación entre Campos

Para validaciones que dependen de múltiples campos, usar `getValues` o `trigger`:

```typescript
const {
  control,
  handleSubmit,
  getValues,
  trigger,
  formState: { isSubmitting },
} = useForm<FormData>({
  defaultValues: { startDate: now, endDate: later },
});

// Validación que depende de otro campo
<Controller
  name="endDate"
  control={control}
  rules={{
    required: 'La fecha de fin es obligatoria',
    validate: (value) => {
      const startDate = getValues('startDate');
      if (startDate >= value) {
        return 'Debe ser posterior a la fecha de inicio';
      }
      return true;
    },
  }}
  render={({ field, fieldState: { error } }) => (
    <InputField
      {...field}
      label="Fecha de fin"
      type="datetime-local"
      required
      error={error?.message}
    />
  )}
/>

// Re-validar campo dependiente cuando cambia el otro
<Controller
  name="startDate"
  control={control}
  render={({ field }) => (
    <InputField
      {...field}
      label="Fecha de inicio"
      onChange={(e) => {
        field.onChange(e);
        trigger('endDate'); // Re-valida endDate
      }}
    />
  )}
/>
```

### Reglas Obligatorias para Formularios

1. **Siempre usar `Controller`** para conectar campos con React Hook Form
2. **Spread `field`** en el componente: `<InputField {...field} />`
3. **Pasar `error?.message`** al prop `error` del componente
4. **Usar `Form.Root`** como wrapper del formulario con `onSubmit={handleSubmit(onFormSubmit)}`
5. **Usar `Form.Submit asChild`** para el botón de envío
6. **Estado de carga**: Usar `isSubmitting` del formState, no estado local
7. **Validación nativa + personalizada**: Los `*Field` soportan ambas (ej: `required`, `minLength` + `rules`)
8. **NO usar `useState`** para valores de campos del formulario
9. **Tests**: Simular interacción de usuario con `userEvent` y verificar validación

### Componentes de Formulario Disponibles

- **InputField**: Para inputs de texto, email, password, tel, number, date, datetime-local
- **Select**: Para desplegables (no requiere Controller si no necesitas validación compleja)
- **TextArea**: Para campos de texto multilínea
- **Button**: Con soporte para estado `loading`

### Custom Hooks

```typescript
import { userApiClient } from "@/infrastructure/ApiServiceFactory";

// TanStack Query para server state
function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => userApiClient.getById(userId),
    staleTime: 5 * 60 * 1000,
  });
}

// Zustand para client state
const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] }),
}));
```

**Reglas obligatorias:**

- Prefijo `use` obligatorio
- Un hook por archivo
- Retornar objeto con propiedades nombradas
- Cada hook en su propia carpeta llamada como el hook
- El test unitario estará en la misma carpeta del hook
- La carpeta de hook no tendrá `index.ts` (el index estará en `hooks/`)
- Seguir arquitectura hexagonal: no llamar fetch directamente, usar clases exportadas por ApiServiceFactory

### Gestión de Estado

```typescript
// Server state: TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});

// Client state: Zustand
const count = useCounterStore((state) => state.count);

// Local state: useState
const [isOpen, setIsOpen] = useState(false);
```

**Reglas obligatorias:**

- NO usar Context API para estado global
- NO usar Redux
- useState solo para estado local del componente

### Derivar Estado

```typescript
// CORRECTO: Derivar durante render
const fullName = `${firstName} ${lastName}`;
const filteredItems = items.filter((item) => item.active);

// INCORRECTO: useEffect para estado derivado
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

### Event Handlers

- Prefijo `handle` + elemento + acción: `handleButtonClick`, `handleFormSubmit`
- Tipar eventos explícitamente: `React.FormEvent<HTMLFormElement>`

## Validación de Código

- Una tarea no está completa hasta que los errores de TypeScript y lint no estén corregidos.

## Testing (TDD)

```typescript
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { render } from "@/test/test-utils";

describe("LoginForm", () => {
  it("should submit form with credentials", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    const { getByRole, getByLabelText } = render(
      <LoginForm onSubmit={onSubmit} />
    );

    await user.type(
      getByRole("textbox", { name: /email/i }),
      "test@example.com"
    );
    await user.type(getByLabelText(/password/i), "secret123");
    await user.click(getByRole("button", { name: /submit/i }));
    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "secret123",
    });
  });
});
```

**Prioridad de queries:**

1. `getByRole` - default
2. `getByLabelText` - formularios
3. `getByPlaceholderText` - sin label
4. `getByText` - no interactivos
5. `getByTestId` - último recurso

**Reglas obligatorias para tests:**

- Todos los componentes que pintan algo por pantalla deben tener como primer test uno de accesibilidad AA usando axe-core, similar a:

```typescript
import { axe } from "@/test/setup";

it("should pass accessibility AA checks", async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

- Intenta usar render de `@testing-library/react` directamente, pero si necesitas un wrapper personalizado (por ejemplo, con providers), usa el render de `@/test/test-utils`.
- Usa las funciones de selector devueltas por render (`getByRole`, etc.) en lugar de `screen`.
- Usa `userEvent` para simular interacciones de usuario.
- Mockear solo lo necesario para el test.
- Siempre que se pueda, se deberá mockear la infraestructura en vez del hook.

## Convenciones de Nombrado

| Elemento            | Convención           | Ejemplo        |
| ------------------- | -------------------- | -------------- |
| Componentes         | PascalCase           | `UserProfile`  |
| Hooks               | camelCase con `use`  | `useAuth`      |
| Funciones           | camelCase            | `formatDate`   |
| Variables           | camelCase            | `userName`     |
| Constantes          | UPPER_SNAKE_CASE     | `API_URL`      |
| Types/Interfaces    | PascalCase           | `UserProps`    |
| Archivos componente | PascalCase           | `UserCard.tsx` |
| Boolean             | is/has/should prefix | `isLoading`    |

## Prohibiciones

Nunca hagas esto:

- NO usar `any` - usar `unknown` si es necesario
- NO usar index como key en listas
- NO definir componentes dentro de otros componentes
- NO usar inline styles (`style={{ ... }}`) - usar solo CSS Modules
- NO usar Tailwind CSS - usar solo CSS Modules
- NO usar CSS-in-JS (styled-components, emotion, etc.) - usar solo CSS Modules
- NO usar utility-first CSS frameworks - usar solo CSS Modules
- NO mutar estado directamente
- NO usar `useEffect` para sincronizar estado
- NO hacer fetch en useEffect - usar TanStack Query
- NO prop drilling más de 2 niveles - usar Zustand

## Manejo de Fechas y Horas

**OBLIGATORIO: Usar Temporal API en toda la aplicación en lugar de Date.**

### Reglas para Fechas

1. **En toda la aplicación (dominio, componentes, hooks, stores):**
   - Usar tipos de Temporal: `Temporal.ZonedDateTime`, `Temporal.PlainDate`, `Temporal.PlainTime`, `Temporal.Instant`
   - Las fechas **siempre** llevan información de locale/zona horaria
   - Nunca usar `Date` nativo de JavaScript
   - Preservar la zona horaria del usuario en toda la aplicación

2. **En la capa de infraestructura (API clients):**
   - Convertir a UTC/ISO string **solo al enviar** datos al backend: `zonedDateTime.toInstant().toString()`
   - Convertir de UTC/ISO string a Temporal **al recibir** datos del backend: `Temporal.Instant.from(isoString).toZonedDateTimeISO(userTimeZone)`
   - La conversión UTC ↔ Temporal debe hacerse exclusivamente en los métodos de los ApiClients

3. **Ejemplos de uso correcto:**

```typescript
// ❌ INCORRECTO - No usar Date
type Appointment = {
  date: Date;
  createdAt: Date;
};

// ✅ CORRECTO - Usar Temporal
type Appointment = {
  dateTime: Temporal.ZonedDateTime;
  createdAt: Temporal.Instant;
};

// ❌ INCORRECTO - Conversión UTC en dominio
const appointment = {
  dateTime: new Date().toISOString(),
};

// ✅ CORRECTO - Temporal en dominio
const appointment = {
  dateTime: Temporal.Now.zonedDateTimeISO(userTimeZone),
};

// ✅ CORRECTO - Conversión UTC solo en ApiClient
class AppointmentApiClient extends BaseApiClient {
  async create(appointment: Appointment): Promise<Appointment> {
    const payload = {
      ...appointment,
      dateTime: appointment.dateTime.toInstant().toString(), // UTC al enviar
    };
    const response = await this.post("/appointments", payload);
    return {
      ...response,
      dateTime: Temporal.Instant.from(response.dateTime).toZonedDateTimeISO(
        userTimeZone
      ), // Temporal al recibir
    };
  }
}

// ✅ CORRECTO - Uso en componente
function AppointmentForm() {
  const [dateTime, setDateTime] = useState<Temporal.ZonedDateTime>(
    Temporal.Now.zonedDateTimeISO("Europe/Madrid")
  );

  const handleDateChange = (newDate: Temporal.PlainDate) => {
    setDateTime(
      newDate.toZonedDateTime({
        timeZone: "Europe/Madrid",
        plainTime: Temporal.PlainTime.from("09:00"),
      })
    );
  };

  return (
    <DatePicker value={dateTime.toPlainDate()} onChange={handleDateChange} />
  );
}

// ✅ CORRECTO - Formateo para mostrar
function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const formatted = appointment.dateTime.toLocaleString("es-ES", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return <p>{formatted}</p>;
}
```

4. **Tipos Temporal más comunes:**
   - `Temporal.ZonedDateTime`: Fecha + hora con zona horaria (para citas, eventos)
   - `Temporal.PlainDate`: Solo fecha sin hora (para fechas de nacimiento, fechas de calendario)
   - `Temporal.PlainTime`: Solo hora sin fecha (para horarios)
   - `Temporal.Instant`: Punto en el tiempo UTC (para timestamps, logs)

5. **Zona horaria del usuario:**
   - Obtener: `Temporal.Now.timeZoneId()` o configurar explícitamente según configuración del usuario
   - Para España: `"Europe/Madrid"`

6. **Testing con Temporal:**

```typescript
it("should format appointment date correctly", () => {
  const appointment = {
    dateTime: Temporal.ZonedDateTime.from(
      "2026-01-15T10:30:00+01:00[Europe/Madrid]"
    ),
  };

  const { getByText } = render(<AppointmentCard appointment={appointment} />);
  expect(getByText(/15.*enero.*2026/i)).toBeInTheDocument();
});
```

### Recursos Temporal API

- Documentación: https://tc39.es/proposal-temporal/docs/
- Polyfill: `@js-temporal/polyfill`
- Comparaciones: `temporal1.equals(temporal2)`, `temporal1.compare(temporal2)`
- Aritmética: `temporal.add({ days: 1 })`, `temporal.subtract({ hours: 2 })`
