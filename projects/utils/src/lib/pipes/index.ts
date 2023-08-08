import { BtwPipe } from './btw/btw.pipe';
import { EntriesPipe } from './entries/entries.pipe';
import { HasObserversPipe } from './has-observers/has-observers.pipe';
import { HasValuesPipe } from './has-values/has-values.pipe';
import { HighlightPipe } from './highlight/highlight.pipe';
import { IbanPipe } from './iban/iban.pipe';
import { JoinPipe } from './join/join.pipe';
import { LimitToPipe } from './limit-to/limit-to.pipe';
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';
import { StripHtmlPipe } from './strip-html/strip-html.pipe';
import { TransformPipe } from './transform/transform.pipe';
import { TruncateTextPipe } from './truncate-text/truncate-text.pipe';

export const Pipes = [
	IbanPipe,
	BtwPipe,
	StripHtmlPipe,
	TruncateTextPipe,
	HighlightPipe,
	EntriesPipe,
	SafeHtmlPipe,
	LimitToPipe,
	HasValuesPipe,
	TransformPipe,
	JoinPipe,
	HasObserversPipe,
];
