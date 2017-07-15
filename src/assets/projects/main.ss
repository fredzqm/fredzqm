; Fred Zhang and Zhou zhou

;:  Single-file version of the interpreter.
;; Easier to submit to server, probably harder to use in the development process



(define (implist-of pred?)
  (lambda(implst)
    (let helper ([ls implst])
      (or (null? ls) (pred? ls)
        (and (pred? (car ls)) (helper (cdr ls)))))))

(define slist-contain?
  (lambda (slist x)
    (if (pair? slist)
      (or (slist-contain? (car slist) x)
        (slist-contain? (cdr slist) x))
      (eq? x slist))))

;; save the nicer chez behavior
(define chez-printf printf)
(define chez-pretty-print pretty-print)


;; use the nicer chez behavior for these
(define sllgen:pretty-print chez-pretty-print)
(define eopl:pretty-print chez-pretty-print)
(define define-datatype:pretty-print chez-pretty-print)


;;I do not want to get into the debugger:
(define eopl:error-stop (lambda () '()))

(define eopl:error errorf)

;-------------------------- from this other file:

;; define-datatype.scm

;; this line must be within 8 lines of the top of the file
'(let ((time-stamp "Time-stamp: <2001-06-08 10:36:53 dfried>"))
  (display (string-append
             "define-datatype.scm version J3 "
             (substring time-stamp 13 29)
             (string #\newline))))

;;; This is an r5rs-compliant datatype system.

;;; exports define-datatype, isa, cases, list-of?, always?
;;; test with (define-datatype:test-all)



;; new error reporting system added by mw Mon Apr 24 14:49:03 2000.
(define define-datatype:report-error eopl:error)
;   (lambda (symbol format . data)
;     ;; print the message
;     (eopl:printf "Error in ~s: " symbol)
;     (apply eopl:printf (cons format data))
;     (newline)
;     (eopl:error-stop)))


(define define-datatype:reset-registries 'ignored)
(define define-datatype:is-a-type? 'ignored)
(define define-datatype:datatype-checker&registry-updater 'ignored)
(define define-datatype:case-checker 'ignored)

(let ((define-datatype:type-registry '())
      (define-datatype:variant-registry '()))

  (set! define-datatype:reset-registries
    (lambda ()
      (set! define-datatype:type-registry '())
      (set! define-datatype:variant-registry '())
      #t))

  (set! define-datatype:is-a-type?
    (lambda (type-name)
      (memq type-name define-datatype:type-registry)))

  (set! define-datatype:datatype-checker&registry-updater
    (letrec ((set?
               (lambda (s)
                 (if (null? s) #t
                   (and (not (memq (car s) (cdr s))) (set? (cdr s)))))))
      (lambda (Type-name Variants)
        (if (not (symbol? Type-name))
          (define-datatype:report-error 'define-datatype
            " The data type name ~s is not an identifier."
            Type-name))
        (for-each
          (lambda (variant)
            (if (not (symbol? (car variant)))
              (define-datatype:report-error 'define-datatype
                (string-append
                  "(While defining the ~a datatype) "
                  "  The variant-name ~s is not an identifier.")
                Type-name (car variant))))
          Variants)
        (let ((variant-names (map car Variants)))
          (if (not (set? variant-names))
            (define-datatype:report-error 'define-datatype
              (string-append
                "(While defining the ~a datatype) "
                "  Some of the variant-names are repeated: ~s.")
              Type-name variant-names))
          (for-each
            (lambda (v)
              (cond  ;;; This assq cannot be changed.
                ((assq v define-datatype:variant-registry) =>
                 (lambda (pair)
                   (if (not (eq? (cdr pair) Type-name))
                     (define-datatype:report-error 'define-datatype
                       (string-append
                         "(While defining the ~a data type) "
                         "  The variant-name ~s has already been "
                         "  used as a variant name in ~s.")
                       Type-name v (cdr pair)))))))
            variant-names)
          (cond ;;; This assq could be a memq over variant names, only.
                ;;; but would reqire a third local registry.
            ((assq Type-name define-datatype:variant-registry) =>
             (lambda (pair)
               (define-datatype:report-error 'define-datatype
                 (string-append
                   "(While defining the ~a data type) "
                   "  The type name ~s has already been "
                   "  used as a variant name ~s in the "
                   "  data type ~s.")
                 Type-name Type-name (car pair) (cdr pair))))
            ((memq Type-name variant-names)
             (define-datatype:report-error 'define-datatype
               (string-append
                 "(While defining the ~a data type) "
                 "  Variant name is the same as the data type name.")
               Type-name)))
          (for-each
            (lambda (variant-name)
              (cond
                ((memq variant-name define-datatype:type-registry)
                 (define-datatype:report-error 'define-datatype
                   (string-append
                     "(While defining the ~a data type) "
                     "  The variant name ~s has already been "
                     "  used as a type name.")
                   Type-name variant-name))))
            variant-names)
          (set! define-datatype:variant-registry
            (append
              (map (lambda (v) (cons v Type-name)) variant-names)
              define-datatype:variant-registry))
          (cond
            ((memq Type-name define-datatype:type-registry) =>
             (lambda (pair)
               (set-car! pair Type-name)))
            (else
              (set! define-datatype:type-registry
                (cons Type-name define-datatype:type-registry))))))))

  (set! define-datatype:case-checker
    (let ((remq-or-false
            (lambda (sym ls)
              (call-with-current-continuation
                (lambda (k)
                  (let f ((ls ls))
                    (cond ((null? ls) (k #f))
                      ((eq? (car ls) sym) (cdr ls))
                      (else (cons (car ls) (f (cdr ls)))))))))))
      (lambda (Type-value Type-name Expression clauses)
        (if (eq? Type-name Expression)
          (begin
            (define-datatype:report-error 'cases
              (string-append
                "The data type ~s should not be the same "
                "  as a lexical variable.")
              Type-name))
          (let ((variant-table (cdr Type-value)))
            (let f ((clauses* clauses)
                    (unused-variants (map car variant-table)))
              (if (null? clauses*)
                (if (not (null? unused-variants))
                  (begin
                    (define-datatype:report-error 'cases "Missing variant clauses for ~s."
                      unused-variants)))
                (let* ((head-clause (car clauses*))
                       (tail-clauses (cdr clauses*))
                       (purported-variant (car head-clause)))
                  (if (eq? purported-variant Expression)
                    (begin
                      (define-datatype:report-error 'cases
                        (string-append
                          "The variant name ~s should not be the same "
                          "  as a lexical variable.")
                        Expression))
                    (cond
                      ((and (null? tail-clauses) (eq? purported-variant 'else))
                 ; do nothing, we're fine
                       )
                      ((assq purported-variant variant-table)
                       =>
                       (lambda (p)
                         (let ((fields (cdr p))
                               (purported-fields (cadr head-clause))
                               (new-unused-variants-or-false
                                 (remq-or-false
                                   purported-variant
                                   unused-variants)))
                           (if (not (=
                                      (length fields)
                                      (length purported-fields)))
                             (begin
                               (define-datatype:report-error 'cases "Bad fields in ~s." head-clause)))
                           (if (not new-unused-variants-or-false)
                             (begin
                               (define-datatype:report-error 'cases "Duplicate variant clause: ~s."
                                 head-clause)))
                           (f tail-clauses new-unused-variants-or-false))))
                      (else
                       (define-datatype:report-error 'cases
                          "Bad clause: ~s."
                          head-clause)))))))))))))

(define-syntax isa
  (syntax-rules ()
    ((_)
     (define-datatype:report-error 'isa "isa expects 1 argument, not 0."))
    ((_ type-name)
     (if (symbol? 'type-name)
       (lambda args
         (if (null? args)
           (define-datatype:report-error 'isa "(isa ~s) expects 1 argument, not 0." 'type-name)
           (if (null? (cdr args))
             (let ((variant (car args)))
               (let ((type-info type-name))
                 (if (and (pair? type-info) (list? (car type-info)))
                   (and (pair? variant)
                     (memq (car variant) (car type-info)) #t)
                   (define-datatype:report-error 'isa
                     (string-append
                       "(isa ~s) did not get a data type bound to an "
                       "  appropriate structure: ~s. "
                       "  This tends to happen when the type name is "
                       "  bound to a lexical variable.")
                     'type-name type-info))))
             (define-datatype:report-error 'isa
               (string-append
                 "(isa ~s) expects 1 argument, not ~s. "
                 "  With argument list = ~s.")
               'type-name (length args) args))))
       (define-datatype:report-error 'isa "Type name is not a symbol: ~s." 'type-name)))
    ((_  type-name other ...)
     (define-datatype:report-error 'isa "(isa ~s) expects 1 argument, not ~s with ~s."
       'type-name (add1 (length '(other ...)))
       (cons 'isa '(type-name other ...))))))

(define-syntax define-datatype
  (syntax-rules ()
    ((_ Type-name)
     (define-datatype:report-error 'define-datatype
       (string-append
         "   There are no variants:    ~s.")
       '(define-datatype Type-name)))
    ((_ Type-name Type-name?)
     (define-datatype:report-error 'define-datatype
       (string-append
         "   There are no variants:    ~s.")
       '(define-datatype Type-name Type-name?)))
    ((_ Type-name Type-name?
       (Variant-name (Field-name Pred?) ...)
       ...)
     (begin
       ;[wdc]
       (define ignored
               (define-datatype:datatype-checker&registry-updater
               'Type-name
               '((Variant-name (Field-name Pred?) ...)
                 ...)))
       ;[\wdc]
       (define Type-name
         (cons '(Variant-name ...)
           '((Variant-name Field-name ...) ...)))
       (define Type-name?
         (if (symbol? 'Type-name)
           (lambda args
             (if (null? args)
               (define-datatype:report-error 'Type-name? "expects 1 argument, not 0.")
               (if (null? (cdr args))
                 (let ((variant (car args)))
                   (let ((type-info Type-name))
                     (if (and (pair? type-info) (list? (car type-info)))
                       (and (pair? variant)
                         (memq (car variant) (car type-info)) #t)
                       (define-datatype:report-error 'Type-name?
                         (string-append
                           "did not get a data type bound to an "
                           "  appropriate structure: ~s. "
                           "  This tends to happen when the type name is "
                           "  bound to a lexical variable.")
                         'type-name type-info))))
                 (define-datatype:report-error 'Type-name?
                   (string-append
                     "expects 1 argument, not ~s. "
                     "  With argument list = ~s.")
                    (length args) args))))
           (define-datatype:report-error 'Type-name "Type name is not a symbol: ~s." 'type-name)))
       (define Variant-name
         (let ((expected-length (length '(Field-name ...)))
               (field-names '(Field-name ...))
               (pred-names '(Pred? ...))
               (preds (list (lambda (x) (Pred? x)) ...)))
           (lambda args
             (if (not (= (length args) expected-length))
               (define-datatype:report-error 'Variant-name
                 (string-append
                   "Expected ~s arguments but got ~s arguments."
                   "   Fields are: ~s    Args are: ~s.")
                 expected-length (length args) '(Field-name ...) args))
             (for-each
               (lambda (a f p pname)
                 (if (not (p a))
                   (define-datatype:report-error 'Variant-name "  Bad ~a field (~s ~s) => #f."
                     f pname a)))
               args
               field-names
               preds
               pred-names)
             (cons 'Variant-name args))))
       ...))))

(define-syntax cases
  (syntax-rules ()
    ((_ Type-name Expression . Clauses)
     (let ((type-predicate? (isa Type-name)))
       (define-datatype:case-checker
         Type-name
         'Type-name
         'Expression
         'Clauses)
       (let ((x Expression))
         (if (type-predicate? x)
           (define-datatype:case-helper x . Clauses)
           (begin
             (define-datatype:report-error 'cases
               "   Not a ~a variant: ~s." 'Type-name x))))))))

;;; this only works because no-variant datatypes are invalid.
(define-syntax define-datatype:case-helper
  (syntax-rules (else)
    ((_ Variant (else Body0 Body1 ...))
     (begin Body0 Body1 ...))
    ((_ Variant (Purported-variant-name (Purported-field-name ...)
                  Body0 Body1 ...))
     (apply (lambda (Purported-field-name ...) Body0 Body1 ...)
       (cdr Variant)))
    ((_ Variant (Purported-variant-name (Purported-field-name ...)
                  Body0 Body1 ...)
       Clause ...)
     (if (eq? (car Variant) 'Purported-variant-name)
         (apply (lambda (Purported-field-name ...) Body0 Body1 ...)
           (cdr Variant))
         (define-datatype:case-helper Variant Clause ...)))
    ((_ Variant Neither-an-else-nor-clause ...)
     (define-datatype:report-error 'cases
       " Not a ~a clause: ~s." 'Type-name
       (list Neither-an-else-nor-clause ...)))))

;;; ------------------------------
;;; general helpers

(define always?
  (lambda (x) #t))

(define list-of
  (lambda (pred . l)
    (let ((all-preds (cons pred l)))
      (lambda (obj)
        (let loop ((obj obj) (preds '()))
          (or
            ;; if list is empty, preds should be, too
            (and (null? obj) (null? preds))
            (if (null? preds)
                ;; if preds is empty, but list isn't, then recycle
                (loop obj all-preds)
                ;; otherwise check and element and recur.
                (and (pair? obj)
                     ((car preds) (car obj))
                     (loop (cdr obj) (cdr preds))))))))))



(define-datatype syntax-pattern syntax-pattern?
  [listpt (carpt syntax-pattern?) (cdrpt syntax-pattern?)]
  [multpt (eachpt syntax-pattern?) (endpt syntax-pattern?)]
  [sympt (id symbol?)]
  [exprpt (id symbol?)]
  [contpt (sym symbol?)]
  [wildpt]
  [emptpt]
  )

(define-datatype result-pattern result-pattern?
  [listpt-r (pts (implist-of result-pattern?))]
  [multpt-r (i number?) (eachrpt result-pattern?)]
  [exprpt-r (id symbol?)]
  [contpt-r (sym (lambda(x) #t))]
  )




;-------------------+
;                   |
;  defined-syntax   |
;                   |
;-------------------+




(define eval-define-syntax
  (let ([define-syntax-pattern
          (listpt
            (sympt 'keyword)
            (listpt
              (listpt
                (contpt 'syntax-rules)
                (listpt
                  (multpt (exprpt 'const) (emptpt))
                  (listpt
                    (listpt
                        (listpt
                          (wildpt)
                          (exprpt 'pattern1))
                        (listpt
                          (exprpt 'result1)
                          (emptpt)))
                    (multpt (listpt
                                (listpt
                                  (wildpt)
                                  (exprpt 'pattern2))
                                (listpt
                                  (exprpt 'result2)
                                  (emptpt)))
                    (emptpt)))))
              (emptpt)))]
        [define-syntax-result
          (listpt-r (list
            (exprpt-r 'keyword)
            (listpt-r (list (multpt-r 1 (exprpt-r 'const))))
            (listpt-r (cons (exprpt-r 'pattern1)
                            (exprpt-r 'result1)))
            (multpt-r 2 (listpt-r (cons (exprpt-r 'pattern2)
                                        (exprpt-r 'result2))))))])
      (lambda (form)
        (let ([try (matchRule define-syntax-pattern define-syntax-result form)])
            (if (not try)
              (eopl:error 'eval-define-syntax "Invalid define-syntax format ~s" (cons 'define-syntax form)))
            (let ([keyword (car try)][constantls (cadr try)][rulesls (cddr try)])
              (update-table! global-syntax-env
                keyword
                (map (lambda (x) (parse-syntax-result-pair (car x)(cdr x) constantls)) rulesls)))
          (refer (void))))))



(define parse-syntax-result-pair
  (lambda (syntax result constantls)
    (let* ([parsed-syntax (parse-syntax-pattern syntax constantls)]
          [occurs (occurs-syntax-pattern parsed-syntax)]
          [parsed-result (parse-result-pattern result occurs)]
          [parsed-result-indexed (findMultIndex parsed-result occurs)])
      (if (not parsed-result-indexed)
        (eopl:error 'findMultIndex "the multi-pattern cannot be matched correctly ~s" (list syntax result)))
      (cons parsed-syntax parsed-result-indexed))))


(define parse-syntax-pattern
  (lambda (pat constantls)
    (let ([symls '()])
      (let parseLoop ([pat pat])
        (cond
          [(null? pat)
            (emptpt)]
          [(symbol? pat)
            (cond
             [(eq? pat '...) (eopl:error 'parse-syntax-pattern "improper use of ...")] ; to signal ...
             [(eq? pat '_) (wildpt)]
             [(member pat constantls) (contpt pat)]
             [else
                (if (member pat symls)
                  (eopl:error 'parse-syntax-pattern "repeated pattern name: ~s" pat)
                  (set! symls (cons pat symls)))
                (exprpt pat)])]
          [(pair? pat)
            (if (and (pair? (cdr pat))(eq? '... (cadr pat)))
              (multpt (parseLoop (car pat))
                (parseLoop (cddr pat)))
              (listpt (parseLoop (car pat))
                (parseLoop (cdr pat))))]
          [else (eopl:error 'parseLoop "Invalid sytax pattern ~s" pat)])))))


(define occurs-syntax-pattern
  (lambda (pattern)
    (cases syntax-pattern pattern
      [listpt (carpt cdrpt)
        (let ([carOccur (occurs-syntax-pattern carpt)]
              [cdrOccur (occurs-syntax-pattern cdrpt)])
          (cons (append (car carOccur)(car cdrOccur))
            (append (cdr carOccur)(cdr cdrOccur))))]
      [multpt (eachpt endpt)
        (let ([eachOccur (occurs-syntax-pattern eachpt)]
              [endOcuur (occurs-syntax-pattern endpt)])
            (cons (car endOcuur)
              (cons eachOccur (cdr endOcuur))))]
      [sympt (id)
        (list (list id))]
      [exprpt (id)
        (list (list id))]
      [contpt (sym) (list '())]
      [wildpt () (list '())]
      [emptpt () (list '())])))


(define parse-result-pattern
  (lambda (pat occurs)
    (let ([const? (lambda(x)
                    (not (slist-contain? occurs x)))])
      (let parseLoop ([pat pat])
        (cond
          [(symbol? pat)
            (case pat
             [(...) (eopl:error 'parse-result-pattern "improper use of ...")] ; to signal ...
             [(_) (eopl:error 'parse-result-pattern "improper use of _")]
             [else (if (const? pat)
                      (contpt-r pat)
                      (exprpt-r pat))])]
          [(null? pat)
            (listpt-r '())]
          [(pair? pat)
            (let ([parsed
              (let loop ([pat pat])
                (cond
                  [(null? pat) '(0)]
                  [(not (pair? pat)) (cons 0 (parseLoop pat))] ; improper list
                  [(eq? (car pat) '...)
                    (let ([rest (loop (cdr pat))])
                      (cons (+ 1 (car rest)) (cdr rest)))]
                  [else (let ([pat (parseLoop (car pat))]
                              [rest (loop (cdr pat))])
                    (let loop2 ([pat pat]
                                [multOrder (car rest)]
                                [end (cdr rest)])
                      (if (= 0 multOrder)
                        (cons* 0 pat end)
                        (loop2 (multpt-r 0 pat) (- multOrder 1) end))))]))])
              (if (not (= 0 (car parsed)))
                (eopl:error 'parse-result-pattern "... is not matched to symbol ~s" pat))
              (listpt-r (cdr parsed)))]
          [else (contpt-r pat)])))))


(define findMultIndex
  (lambda (result occurs)
    (cases result-pattern result
      [listpt-r (pts)
        (let ([try (let loop ([pts pts])
            (cond
              [(null? pts)  '()]
              [(result-pattern? pts) (findMultIndex pts occurs)]
              [else (let ([carpt (findMultIndex (car pts) occurs)])
                (and carpt
                  (let ([cdrpt (loop (cdr pts))])
                    (and cdrpt
                      (cons carpt cdrpt)))))]))])
          (and try (listpt-r try)))]
      [multpt-r (i eachrpt)
        (let ([try (let loop ([i 1][envs (cdr occurs)])
              (if (null? envs) #f ; no match found
                (let ([match (findMultIndex eachrpt
                                  (cons (append (car occurs) (caar envs))
                                        (cdar envs)))])
                  (if match  (cons i match)
                    (loop (+ i 1) (cdr envs))))))])
          (and try (multpt-r (car try) (cdr try))))]
      [exprpt-r (id)
          (and (member id (car occurs)) result)]
      [contpt-r (sym)
          result])))



;-----------------------+
;                       |
;   SYNTAX EXPANSION    |
;                       |
;-----------------------+


(define matchRule
  (lambda (pattern result body)
    (let ([matches (matchpattern pattern body)])
      (and matches
        (let ([result (car (assembleResult result matches '()))])
          (if result result '(quote #f)))))))

(define matchpattern
  (lambda (pattern body)
    (cases syntax-pattern pattern
      [listpt (carpt cdrpt)
        (and (pair? body)
          (let ([carMatch (matchpattern carpt (car body))]
                [cdrMatch (matchpattern cdrpt (cdr body))])
            (and carMatch cdrMatch
              (cons (append (car carMatch)(car cdrMatch))
                (append (cdr carMatch)(cdr cdrMatch))))))]
      [multpt (eachpt endpt)
        (let loop ([body body][matchls '()])
          (or
            (and (pair? body)
              (let ([eachMatch (matchpattern eachpt (car body))])
                (and eachMatch
                  (loop (cdr body) (append matchls (list eachMatch))))))
            (let ([endMatch (matchpattern endpt body)])
              (and endMatch
                (cons (car endMatch)
                  (cons matchls (cdr endMatch)))))))]
      [sympt (id)
        (and (symbol? body)
          (list (list (cons id body))))]
      [exprpt (id)
        (list (list (cons id body)))]
      [contpt (sym) (and (eq? sym body) (list '()))]
      [wildpt () (list '())]
      [emptpt () (and (null? body) (list '()))])))


(define assembleResult
  (lambda (result matches end)
    (cases result-pattern result
      [listpt-r (pts)
          (cons
            (let loop ([pts pts])
              (cond
                [(null? pts)  '()]
                [(result-pattern? pts)
                  (car (assembleResult pts matches '()))]
                [else (assembleResult (car pts) matches (loop (cdr pts)))]))
            end)]
      [multpt-r (i eachrpt)
          (fold-right (lambda (match end)
                        (assembleResult eachrpt (cons (append (car matches)(car match))
                                                      (cdr match))
                            end))
            end (list-ref matches i))]
      [exprpt-r (id)
          (cons (cdr (assoc id (car matches))) end)]
      [contpt-r (sym)
          (cons sym end)])))

(define (addPredefinedProcedures)
(eval-many-exps '(

(define map
  (lambda (f ls . more)
    (if (null? more)
        (let map1 ([ls ls])
          (if (null? ls)
              '()
              (cons (f (car ls))
                    (map1 (cdr ls)))))
        (let map-more ([ls ls] [more more])
          (if (null? ls)
              '()
              (cons
                (apply f (car ls) (map car more))
                (map-more (cdr ls) (map cdr more))))))))

(define member
  (lambda (x ls)
    (cond
      [(null? ls) #f]
      [(equal? (car ls) x) ls]
      [else (member x (cdr ls))])))

(define-class (stack)
  ([s '()])
  [(pop)
      (let ([x (car s)])
        (set! s (cdr s))
        x)]
  [(push e)
      (set! s (cons e s))])

(define exit-list
  (lambda x
    (return x)))

(with-values
  (call/cc
    (lambda (k)
      (set! return k)))
  values)

(define escaper
  (lambda (p)
    (lambda args
      (with-values
        (apply p args)
        return))))

(define resume 'resume-undefined)

(define make-coroutine
  (lambda (body)
    (let ([local-continuation 'local-continuation-undefined])
      (letrec
          ([newcoroutine
            (lambda  (value) (local-continuation value))]
           [localresume
            (lambda  (continuation value)
              (let ([value (call/cc (lambda (k)
                                      (set! local-continuation k)
                                      (continuation value)))])
                (set! resume localresume)
                value))])
        (call/cc
         (lambda (exit)
           (body (localresume exit newcoroutine))
           (error 'co-routine "fell off end of coroutine")))))))


(define **trace-level** 0)

(define (**displayIndent**)
  (let loop ([i **trace-level**])
    (display "| ")
    (if (< 0 i)
      (loop (- i 1)))))

(define (**displayIndent+**)
  (**displayIndent**)
  (set! **trace-level** (+ **trace-level** 1)))

(define (**displayIndent-**)
  (set! **trace-level** (- **trace-level** 1))
  (**displayIndent**))


(define display-traced-output
  (let ([multi-indent-string
   (lambda (level)
     (let loop ([level level] [result ""])
       (if (zero? level)
     result
     (loop (- level 1) (string-append result "| ")))))])
  (lambda args   ; (level proc-name args) or (level answer)
    (let ([indent-string (multi-indent-string (car args))])
      (display indent-string)
      (display (if (= 2(length args))
       (cadr args)
       (cons (cadr args) (caddr args)))))
      (newline))))

)))
(define (addSyntaxExpansion)
(eval-many-exps '(

(define-syntax if
    (syntax-rules ()
      [(_ a b)
          (if a b (values))]))

(define-syntax define
    (syntax-rules ()
      [(_ (n a ...) e1 e2 ...)
          (define n
            (lambda (a ...) e1 e2 ...))]
      [(_ (n a ... l) e1 e2 ...)
          (define n
            (lambda (a ... . l) e1 e2 ...))]))

(define-syntax let
    (syntax-rules ()
      [(_ ([x v] ...) e1 e2 ...)
          ((lambda (x ...) e1 e2 ...) v ...)]
      [(_ name ([x v] ...) e1 e2 ...)
          (letrec ([name (lambda (x ...) e1 e2 ...)])
            (name v ...))]))

(define-syntax let*
    (syntax-rules ()
      [(_ ([x v]) e1 e2 ...)
          (let ([x v]) e1 e2 ...)]
      [(_ ([x1 v1] [x2 v2] ...) e1 e2 ...)
          (let ([x1 v1])
            (let* ([x2 v2] ...) e1 e2 ...))]))


(define-syntax letrec
    (syntax-rules ()
      [(_ ([x v] ...) e1 e2 ...)
          (let ([x #f] ...)
            (set! x v) ...
            e1 e2 ...)]))

(define-syntax letrec*
    (syntax-rules ()
      [(_ ([x v]) e1 e2 ...)
          (letrec ([x v]) e1 e2 ...)]
      [(_ ([x1 v1] [x2 v2] ...) e1 e2 ...)
          (letrec ([x1 v1])
            (letrec* ([x2 v2] ...) e1 e2 ...))]))

(define-syntax begin
    (syntax-rules ()
      [(_ e1 e2 ...)
          ((lambda () e1 e2 ...))]))

(define-syntax and
    (syntax-rules ()
      [(_) #t]
      [(_ e) e]
      [(_ e1 e2 e3 ...)
       (if e1 (and e2 e3 ...) #f)]))

(define-syntax or
  (syntax-rules ()
    [(_) #f]
    [(_ e) e]
    [(_ e1 e2 e3 ...)
     (let ([t e1])
       (if t t (or e2 e3 ...)))]))

(define-syntax cond
  (syntax-rules (else)
    [(_ (else l)) l]
    [(_ (p1 e1) (p2 e2) ... (else l))
      (if p1 e1
        (cond (p2 e2) ... (else l)))]
    [(_ (p1 e1))
      (if p1 e1)]
    [(_ (p1 e1) (p2 e2) ...)
      (if p1 e1
        (cond (p2 e2) ...))]))

(define-syntax case
  (syntax-rules (else)
    [(_ sym ((p1 p2 ...) e1 e2 ... ) ... (else l1 l2 ...))
      (cond [(member sym '(p1 p2 ...)) e1 e2 ...] ... (else l1 l2 ...))]
    [(_ sym ((p1 p2 ...) e1 e2 ... ) ... )
      (cond [(member sym '(p1 p2 ...)) e1 e2 ...] ... )]))


(define-syntax define-class
  (syntax-rules ()
    [(_ (className ca ...)
      ([f fnit] ...)
      [(methodName a ...) e1 e2 ...] ...)
        (define (className ca ...)
          (let ([f fnit] ...)
            (lambda (method . args)
              (cond
                [(eq? 'methodName method)
                  (apply (lambda(a ...) e1 e2 ...) args)] ...
                [else (list 'className "Does not have method" method)]))))]))


(define-syntax with-values
  (syntax-rules ()
    [(_ p c)
      (call-with-values (lambda() p) c)]))


(define-syntax let-values
  (syntax-rules ()
    [(_ ([args v]) e1 e2 ...)
          (with-values v (lambda args e1 e2 ...))]
    [(_ ([args1 v1] [args2 v2] ...) e1 e2 ...)
          (with-values v1
            (lambda args1
              (let-values ([args2 v2] ...)
                e1 e2 ...)))]))


; (define-syntax trace-lambda
;   (syntax-rules ()
;     [(_ name (a ...) e1 e2 ...)
;       (lambda (a ...)
;         (**displayIndent+**)
;         (display (list 'name a ...)) (newline)
;         (let ([ret ((lambda (a ...) e1 e2 ...) a ...)])
;           (**displayIndent-**)
;           (display ret) (newline)
;           ret))]))

(define-syntax trace
  (syntax-rules ()
    [(_ func ...)
      (begin
        (set! func
          (let ([originalFuc func])
            (lambda args
              (**displayIndent+**)
              (display (cons 'func args)) (newline)
              (let ([ret (apply originalFuc args)])
                (**displayIndent-**)
                (display ret) (newline)
                ret)))) ...
        (list (quote func) ...))]))


(define-syntax while
  (syntax-rules ()
    [(_ test e1 e2 ...)
      (call/cc (lambda (break)
        (let continue ()
          (break (if test (begin e1 e2 ... (continue)))))))]))


)))

;-------------------+
;                   |
;    DATATYPES      |
;                   |
;-------------------+

; parsed expression
; the core expression of scheme. Syntax expansion should convert all code to core scheme.
(define-datatype cexpression cexpression?
  [var-cexp (varinfo pair?)]
  [lit-cexp
       (datum (lambda (x)
          (ormap (lambda (pred) (pred x))
           (list number? vector? boolean? symbol? string? pair? null?))))]
  [app-cexp (rator cexpression?)
      (rands (list-of cexpression?))]
  [lambda-cexp
      (vars (list-of symbol?))
      (ref-map (implist-of boolean?))
      (body (list-of cexpression?))]
  [if-cexp
      (test cexpression?)
      (then-op cexpression?)
      (else-op cexpression?)]
  [set!-cexp (varinfo pair?)
      (val cexpression?)]
  [define-cexp (var symbol?)
      (val cexpression?)])


; datatype for procedures.  At first there is only one
; kind of procedure, but more kinds will be added later.
(define-datatype proc-val proc-val?
  [prim-proc
    (name symbol?)
    (proc procedure?)]
  [special-proc
    (name symbol?)]
  [closure
    (variableLength boolean?)
    (ref-map (implist-of boolean?))
    (body (list-of cexpression?))
    (env list?)]
  [cont-proc
    (k continuation?)])


;-------------------+
;                   |
; ENVIRON TEMPLETE  |
;                   |
;-------------------+

(define (empty-templete)
  '())

; create another level of environment
(define (extend-templete syms env)
  (if (not ((list-of symbol?) syms))
    (eopl:error 'extend-templete "syms should be a list of symbols ~s" syms))
  (cons (list syms) env))

; add a posible symbol to this level
(define (add-sym-templete env sym)
  (if (or (null? env) (member sym (caar env)) (member sym (cdar env)))
    env
    (cons
      (cons
        (caar env)
        (cons sym (cdar env)))
      (cdr env))))

(define (merge-templets a b)
  (if (null? a) a
    (cons
      (cons
        (caar a)
        (let loop ([x (cdar a)][y (cdar b)])
          (if (null? x) y
            (if (member (car x) y)
              (loop (cdr x) y)
              (cons (car x) (loop (cdr x) y))))))
      (cdr a))))

; return a var-cexp represented in lexical order.
; variable representation
; free var: '(name)
; bounded var: '(name depth . index)
; uncertain free var: '(name d1 d2 d3 ...)
; uncertain bounded var: '(name d1 d2 d3 ... depth . index)
(define (search-in-templete env sym bounded free)
  (let helper ([env env]
              [k (lambda (num ls)
                (if num
                  (bounded (cons* sym num ls))
                  (free (cons sym ls))))])
    (if (null? env)
        (k #f '())
        (index-in-ls sym (caar env)
          (lambda(lexiIndex)
            (if lexiIndex
              (k 0 lexiIndex)
              (helper (cdr env)
                (lambda (num ls)
                  (if num
                    (index-in-ls sym (cdar env)
                      (lambda (posible)
                        (if posible
                          (k 0 (cons num ls))
                          (k (+ num 1) ls))))
                    (index-in-ls sym (cdar env)
                      (lambda (posible)
                        (if posible
                          (k 0 '())
                          (k #f '())))))))))))))

; a helper method for templete
(define (index-in-ls sym ls k)
  (if (null? ls)
    (k #f)
    (if (eq? sym (car ls))
      (k 0)
      (index-in-ls sym (cdr ls)
        (lambda (x)
          (k (and x (+ 1 x))))))))


;-------------------+
;                   |
; LOCAL ENVIRONMENT |
;                   |
;-------------------+

(define (empty-local-env)
  '())

(define (apply-local-env env info succeed fail)
  (let ([sym (car info)])
    (if (null? (cdr info))
      (search-table global-env sym succeed fail)
      (let helper ([carls (cadr info)][cdrls (cddr info)][env env])
        (if (= carls 0)
          (if (integer? cdrls)
            (succeed (vector-ref (caar env) cdrls))
            (search-table (cdar env) sym
              succeed
              (lambda ()
                (if (null? cdrls)
                  (search-table global-env sym succeed fail)
                  (helper (car cdrls)(cdr cdrls) (cdr env))))))
          (helper (- carls 1) cdrls (cdr env)))))))


(define (extend-local-env vary? ref-map args env succeed fail)
  (let helper ([ref-map ref-map][args args]
              [k (lambda (curLevel)
                    (succeed
                      (cons
                        (cons
                          (list->vector curLevel)
                          (empty-table))
                        env)))])
    (if (null? ref-map)
      (if vary?
        (k (list (refer (map de-refer args))))
        (if (null? args)
          (k '())
          (fail)))
      (if (null? args)
        (fail)
        (helper (cdr ref-map) (cdr args)
            (lambda (cdrVal)
              (k
                (cons
                  (if (car ref-map)
                    (car args)
                    (refer (de-refer (car args))))
                  cdrVal))))))))


(define (define-in-local-env! env sym val)
  (if (null? env)
    (update-table! global-env sym val)
    (update-table! (cdar env) sym val)))

;-------------------+
;                   |
; GLOBAL ENVIRONMENT|
;                   |
;-------------------+

(define (empty-table)
  (make-hashtable
    (lambda(s)(string-length (symbol->string s)))
    symbol=?))

; Environment definitions for CSSE 304 Scheme interpreter.  Based on EoPL section 2.3
(define create-table
  (lambda (syms vals)
    (if (not (= (length syms)(length vals)))
      (eopl:error 'create-table "syms and vals has different length syms ~s vals" syms vals))
    (let ([env (empty-table)])
      (let loop ([syms syms][vals vals])
        (if (null? syms)
          env
          (begin
            (update-table! env (car syms) (car vals))
            (loop (cdr syms)(cdr vals))))))))

(define search-table
  (lambda (env sym succeed fail) ; succeed and fail are procedures applied if the var is or isn't found, respectively.
    (if (hashtable-contains? env sym)
      (succeed (hashtable-ref env sym #f))
      (fail))))


(define update-table!
  (lambda (env sym val)
    (hashtable-set! env sym val)))



;-------------------+
;                   |
;    PARSER         |
;                   |
;-------------------+


; You will want to replace this with your parser that includes more expression types, more options for these types, and error-checking.
; Procedures to make the parser a little bit saner.
(define 1st car)
(define 2nd cadr)
(define 3rd caddr)

(define parse-exp
  (lambda (datum templete k)
    (let ([curlev-parse (lambda (exp) (parse-exp exp templete (lambda (temp result) result)))])
      (if (pair? datum)
        (let ([rator (car datum)][rands (cdr datum)])
          (if (symbol? rator) (search-in-templete templete rator
              (lambda (bounded)
                (k templete (app-cexp (var-cexp bounded) (map curlev-parse rands)))) ; occur bounded
              (lambda (free) (search-table global-syntax-env rator ; occur free
                (lambda (expanRules) (apply-syntax expanRules datum
                  (lambda(x) (parse-exp x templete k))
                  (lambda() (search-table core-syntax-env rator
                    (lambda(coreRules) (apply-core-syntax coreRules datum templete k)) ; does proper syntax exapnsion
                    (lambda() (eopl:error 'syntax-expansion "Invalid sytanx ~s" datum)))))) ; try syntax exapnsion but failed
                (lambda() (search-table core-syntax-env rator
                  (lambda(coreRules) (apply-core-syntax coreRules datum templete k))
                  (lambda() (k templete (app-cexp (var-cexp free) (map curlev-parse rands)))))))))
            (k templete (app-cexp (curlev-parse rator) (map curlev-parse rands)))))
        (k templete (cond
          [(symbol? datum) (search-in-templete templete datum
                              (lambda (bounded) (var-cexp bounded))
                              (lambda (free) (var-cexp free)))]
          [(number? datum) (lit-cexp datum)]
          [(vector? datum) (lit-cexp datum)]
          [(boolean? datum) (lit-cexp datum)]
          [(string? datum) (lit-cexp datum)]
          [(null? datum) (lit-cexp datum)]
          [else (eopl:error 'parse-exp "bad expression: ~s" datum)]))))))


(define apply-syntax
  (lambda (syntaxList exp succeed fail)
    (let ([try (ormap (lambda(x) (matchRule (car x) (cdr x) (cdr exp))) syntaxList)])
      (if try
        (succeed try)
        (fail)))))


(define apply-core-syntax
  (lambda (coreSyntax exp templete k)
    (let ([sym (car exp)][body (cdr exp)])
      (or (ormap (lambda(x) (matchpattern x body)) coreSyntax)
        (eopl:error 'apply-core-syntax "Invalid core expression format ~s" exp))
      (case sym
        [(quote)
          (k templete (lit-cexp (car body)))]
        [(lambda)
          (let helper ([varls (car body)]
                      [k (lambda (vars ref-map)
                          (k
                            templete
                            (lambda-cexp
                              vars
                              ref-map
                              (let loop ([code (cdr body)][templete (extend-templete vars templete)])
                                (if (null? code) '()
                                  (parse-exp (car code) templete
                                    (lambda (temp result)
                                      (cons result (loop (cdr code) temp)))))))))])
            (cond
              [(null? varls) (k '() '())]
              [(symbol? varls) (k (list varls) '())]
              [(pair? varls)
                (helper (cdr varls)
                  (lambda (cdrVars cdrRef-map)
                    (cond
                      [(symbol? (car varls))
                        (k
                          (cons (car varls) cdrVars)
                          (cons #f cdrRef-map))]
                      [(and (pair? (car varls)) (eq? 'ref (caar varls))
                        (symbol? (cadar varls)) (null? (cddar varls)))
                        (k
                          (cons (cadar varls) cdrVars)
                          (cons #t cdrRef-map))]
                      [else (eopl:error 'lambda-cexp "In correct format of lambda expression ~s" (cons 'lambda body))])))]))]
        [(if)
          (parse-exp (car body) templete
            (lambda (temp-test result-test)
              (parse-exp (cadr body) temp-test
                (lambda (temp-then result-then)
                  (parse-exp (caddr body) temp-test
                    (lambda (temp-else result-else)
                      (k
                        (merge-templets temp-then temp-else)
                        (if-cexp result-test result-then result-else))))))))]
        [(set!)
          (k
            templete
            (set!-cexp
              (search-in-templete templete (car body)
                (lambda (x) x) (lambda (x) x))
              (parse-exp (cadr body) templete
                (lambda (temp result) result))))]
        [(define)
          (k
            (add-sym-templete templete (car body))
            (define-cexp
              (car body)
              (parse-exp (cadr body) templete
                (lambda (temp result) result))))]
        [else (eopl:error 'apply-core-syntax "not implemented core expression ~s" exp)]))))


;-----------------------+
;                       |
;       REFERENCE       |
;                       |
;-----------------------+

(define reference?
  (lambda (x)
    (or (box? x) (list? x))))

; these three functions define ADT reference, the return value of eval-exp
(define (refer . a)
  (cond
    [(null? a) '()]
    [(null? (cdr a)) (box (car a))]
    [else a]))

(define (de-refer ref)
  (cond
    [(box? ref) (unbox ref)]
    [(null? ref) (void)]
    [(and (list? ref) (< 1 (length ref)))
      (eopl:error 'de-refer "Return multiple values ~s to single value environment" ref)]
    [else (eopl:error 'de-refer "Try to de-reference Invalid reference ~s" ref)]))

(define (de-refer-aslist ref)
  (cond
    [(null? ref) '()]
    [(box? ref) (list (unbox ref))]
    [(and (list? ref) (< 1 (length ref)))
      ref]
    [else (eopl:error 'de-refer-aslist "Try to de-reference Invalid reference ~s" ref)]))

(define (modify! ref val)
  (if (not (box? ref))
    (eopl:error 'modify! "Can only modify a reference with one value: ~s," ref)
    (set-box! ref val)))


;-------------------+
;                   |
;   INTERPRETER     |
;                   |
;-------------------+

; the shell entry
(define rep      ; "read-eval-print" loop.
  (lambda ()
    (display "--> ")
    (let displayLoop ([answers (de-refer-aslist (top-level-eval (read)))])
      (if (null? answers)
        (rep)
        (begin
          (eopl:pretty-print (car answers))
          (displayLoop (cdr answers)))))))

(define (toString v)
  (if (proc-val? v)
    (cases proc-val v
      [prim-proc (name)
        (list 'prim-proc name)]
      [special-proc (name)
        (list 'prim-proc name)]
      [closure (variableLength vars ref-map body env)
        (list 'lambda vars (unparse-exp body))])))

; the separate interpreter entry
(define eval-one-exp
  (lambda (x)
    (apply values (de-refer-aslist (top-level-eval x)))))

(define eval-many-exps
  (lambda (ls)
    (for-each top-level-eval ls)))

; top-level-eval evaluates a form in the global environment
(define top-level-eval
  (lambda (form)
    (cond
      [(and (pair? form) (eq? (car form) 'define-syntax)
        (eval-define-syntax (cdr form)))]
      [else
        (parse-exp form
          (empty-templete)
          (lambda (temp result)
            (eval-exp
              result
              (empty-local-env)
              (final-k))))])))


;-----------------------+
;                       |
;      EVALUATION       |
;                       |
;-----------------------+

(define-datatype continuation continuation?
  [if-k
    (then-op cexpression?)
    (else-op cexpression?)
    (env list?)
    (next-k continuation?)]
  [eval-rands-k
    (next-k continuation?)]
  [eval-rands-car-k
    (cdr-rands (list-of cexpression?))
    (env list?)
    (next-k continuation?)]
  [eval-rands-cdr-k
    (car-ref reference?)
    (env list?)
    (next-k continuation?)]
  [set!-k
    (varinfo pair?)
    (env list?)
    (next-k continuation?)]
  [define-k
    (var symbol?)
    (env list?)
    (next-k continuation?)]
  [eval-body-k
    (cdr-code (list-of cexpression?))
    (env list?)
    (next-k continuation?)]
  [call-with-values-k
    (consumer reference?)
    (next-k continuation?)]
  [final-k])



(define apcont (lambda (k x)
    (if (procedure? k)
      (begin
        (display x) (newline)
        (display k) (newline)
        (k x))
      (cases continuation k
        [if-k (then-op else-op env next-k)
          (if (de-refer x)
            (eval-exp then-op env next-k)
            (eval-exp else-op env next-k))]
        [eval-rands-k (next-k)
          (apply-proc (car x) (cdr x) next-k)]
        [eval-rands-car-k (cdr-rands env next-k)
          (eval-rands cdr-rands env
            (eval-rands-cdr-k x env next-k))]
        [eval-rands-cdr-k (car-ref env next-k)
          (apcont next-k (cons car-ref x))]
        [set!-k (varinfo env next-k)
          (apply-local-env env varinfo
            (lambda (ref) (modify! ref (de-refer x)))
            (lambda () (update-table! global-env (car varinfo) x)))
          (apcont next-k (refer))]
        [define-k (var env next-k)
          (define-in-local-env! env var x)
          (apcont next-k (refer))]
        [eval-body-k (cdr-code env next-k)
          (eval-body cdr-code env next-k)]
        [call-with-values-k (consumer next-k)
          (apply-proc consumer (map refer (de-refer-aslist x)) next-k)]
        [final-k () x]
        [else (eopl:error 'apcont "Undefined continuation: ~s" k)]))))

; eval-exp is the main component of the interpreter
; eval-exp should return a list of result.
; this well help the implementation of multiple return value
; It also makes reference easier
(define (eval-exp exp env k)
    (cases cexpression exp
      [lit-cexp (datum) (apcont k (refer datum))]
      [var-cexp (varinfo)
        (apply-local-env env varinfo ; look up its value.
         (lambda (x) (apcont k x)) ; procedure to call if id is in the environment
         (lambda () (eopl:error 'apply-local-env "variable not found in environment: ~s" varinfo)))]
      [if-cexp (test then-op else-op)
        (eval-exp test env
          (if-k then-op else-op env k))]
      [lambda-cexp (vars ref-map body)
        (apcont k (refer
          (closure (not (= (length vars)(length ref-map)))
            ref-map body env)))]
      [set!-cexp (varinfo val)
        (eval-exp val env
          (set!-k varinfo env k))]
      [define-cexp (var val)
        (eval-exp val env
          (define-k var env k))]
      [app-cexp (rator rands)
        (eval-rands (cons rator rands) env
          (eval-rands-k k))]
      [else (eopl:error 'eval-exp "Bad abstract syntax: ~a" exp)]))


(define (eval-rands rands env k)
    (if (null? rands)
      (apcont k '())
      (eval-exp (car rands) env
        (eval-rands-car-k (cdr rands) env k))))

; evaluate the list of operands, putting results into a list
;  Apply a procedure to its arguments.
;  At this point, we only have primitive procedures.
;  User-defined procedures will be added later.
; arguments:
;   proc-r: reference of a procedure, not de-referred
;   args: list of arguments, the list is not referred, but each arg is referred
(define (apply-proc proc-r args k) ; args should not have been de-referred
    (let ([proc-v (de-refer proc-r)])
      (cases proc-val proc-v
        [prim-proc (op proc) (apcont k (refer (apply proc (map de-refer args))))]
        [special-proc (op)
          (case op
            [(apply)
              (if (null? (cdr args))
                (eopl:error 'apply "with no argument ~s" proc-v))
              (apply-proc (car args)
                (map refer (apply cons* (map de-refer (cdr args))))
                k)]
            [(call-with-values)
              (if (not (= 2 (length args)))
                (eopl:error 'call-with-values "call-with-values takes two parameters: a producer and a consumer: ~s" args))
              (apply-proc (car args) '()
                (call-with-values-k (cadr args) k))]
            [(values)
              (apcont k (apply refer (map de-refer args)))]
            [(call/cc)
              (if (not (null? (cdr args)))
                (eopl:error 'call/cc "call/cc only take one argument: ~s" args))
              (apply-proc (car args) (list (refer (cont-proc k))) k)])]
        [closure (vary? ref-map body env)
          (extend-local-env vary? ref-map args env
            (lambda (env) (eval-body body env k))
            (lambda () (eopl:error 'apply-proc "not enough arguments: closure ~a ~a" proc-v args)))]
        [cont-proc (k)
          (apcont k (apply refer (map de-refer args)))]
        [else (eopl:error 'apply-proc "Attempt to apply bad procedure: ~s" proc-v)])))

(define (eval-body code env k)
    (eval-exp (car code) env
      (if (null? (cdr code)) k
        (eval-body-k (cdr code) env k))))

;-----------------------+
;                       |
;  GLOBAL ENVIRONMENT   |
;                       |
;-----------------------+

(define global-syntax-env
  (empty-table))

; To be added with define-syntax
(define core-syntax-env
  (create-table
    '(quote lambda if set! define)
    (list
      (list ; quote
        (listpt (exprpt 'e) (emptpt)))
      (list ; lambda
        (listpt (multpt (exprpt 'v) (sympt 'l))
          (multpt (exprpt 'e) (emptpt)))
        (listpt (multpt (exprpt 'v) (emptpt))
          (multpt (exprpt 'e) (emptpt))))
      (list ; if
        (listpt (exprpt 'p)
          (listpt (exprpt 't)
            (listpt (exprpt 'e) (emptpt)))))
      (list ; set!
        (listpt (sympt 'v)
          (listpt (exprpt 'e) (emptpt))))
      (list ; define
        (listpt (sympt 'v)
          (listpt (exprpt 'e) (emptpt)))))))



(define *spec-proc-names* '(apply values call-with-values call/cc))
(define *prim-proc-names* '(+ - * / add1 sub1 zero? not = < > <= >= cons list null? assq eq?
                            eqv? equal? atom? car caar caaar caadr cadar cdaar caddr cdadr cddar cdddr cadr cdar
                            cddr cdr length list->vector list? pair? append list-tail
                            vector->list vector make-vector vector-ref vector? number? symbol? set-car! set-cdr!
                            vector-set! display newline void quotient))


(define (reset-global-env)
  (set! global-env
    (create-table
       (append  '(procedure?) *spec-proc-names* *prim-proc-names*)
       (append
          (list (refer (prim-proc 'procedure? proc-val?)))
          (map (lambda(x) (refer (special-proc x))) *spec-proc-names*)
          (map (lambda(x) (refer (prim-proc x (eval x)))) *prim-proc-names*))))
  (addPredefinedProcedures))






;-----------------------+
;                       |
;       INTIALIZE       |
;                       |
;-----------------------+


(addSyntaxExpansion)
(reset-global-env)


; to easy typing eval-one-exp
(define-syntax i
  (syntax-rules ()
    [(_ x)
      (eval-one-exp (quote x))]
    [(_ x1 x2 ...)
      (eval-many-exps
        (list (quote x1) (quote x2) ...))]))

; to ease tracing
(define t
  (lambda ()
    (trace eval-exp eval-body apply-proc eval-rands)))
