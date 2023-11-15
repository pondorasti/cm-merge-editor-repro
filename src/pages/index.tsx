import { DOCUMENT_A, DOCUMENT_B } from "@/documents"
import { syntaxHighlighting } from "@codemirror/language"
import { MergeView } from "@codemirror/merge"
import { EditorView, lineNumbers } from "@codemirror/view"
import { useEffect, useRef, useState } from "react"
import { classHighlighter } from "@lezer/highlight"
import { EditorState } from "@codemirror/state"

export default function Home() {
  const mergeViewRef = useRef()
  const [mergeView, setMergeView] = useState<MergeView>()

  useEffect(() => {
    const extensions = [
      lineNumbers(),
      syntaxHighlighting(classHighlighter),
      EditorState.readOnly.of(true),
      EditorView.editable.of(false),
      EditorView.theme({}),
    ]

    const view = new MergeView({
      a: {
        doc: DOCUMENT_A,
        extensions,
      },
      b: {
        doc: DOCUMENT_B,
        extensions,
      },
      diffConfig: {
        scanLimit: 50000,
      },
      highlightChanges: false,
      gutter: true,
      parent: mergeViewRef.current,
    })

    setMergeView(view)
  }, [])

  useEffect(() => {
    return () => {
      mergeView?.destroy()
    }
  }, [mergeView])

  // @ts-expect-error
  return <main ref={mergeViewRef} className="" />
}
