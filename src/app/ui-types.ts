export type ModalState =
  | { kind: 'discuss' }
  | { kind: 'audit' }
  | { kind: 'case'; id: string }
  | { kind: 'about'; id: string }
  | { kind: 'team'; id: string }
  | { kind: 'screencast' }
  | {
      kind: 'video'
      src: string
      title: string
      orientation?: 'portrait' | 'landscape'
    }
